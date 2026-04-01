import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, getDocs, where, writeBatch, doc, setDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const STRAVA_CLUB_ID = '1098891';
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

// ─── Refresh Token ──────────────────────────────────
async function getFreshAccessToken() {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    console.error("❌ Thiếu STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET hoặc STRAVA_REFRESH_TOKEN trong file .env");
    process.exit(1);
  }
  console.log("🔄 Đang lấy Access Token mới...");
  const res = await axios.post('https://www.strava.com/oauth/token', {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });
  return res.data.access_token;
}

// ─── Helpers ────────────────────────────────────────
function formatPace(mps) {
  if (!mps) return "0'00\"";
  const spk = 1000 / mps;
  return `${Math.floor(spk / 60)}'${Math.floor(spk % 60).toString().padStart(2, '0')}"`;
}

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
}

function getStartOfPeriod(type) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (type === 'week') {
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
  } else if (type === 'last_week') {
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1 - 7); // Thứ 2 tuần trước
  } else if (type === 'month') {
    d.setDate(1);
  }
  return d.getTime();
}

function getEndOfLastWeek() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day); // Chủ nhật tuần trước
  return d.getTime();
}

// ─── 1. Sync Activities ─────────────────────────────
async function syncActivities(accessToken) {
  console.log("📥 Đang kéo hoạt động từ Strava...");
  const response = await axios.get(`https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=200`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const activities = response.data;
  if (!Array.isArray(activities)) { console.error("❌ Dữ liệu không hợp lệ"); return 0; }

  // Tải tất cả strava_id để so sánh 1 lần duy nhất thay vì query liên tục
  const snap = await getDocs(collection(db, "activities"));
  const existingSet = new Set();
  snap.docs.forEach(d => existingSet.add(String(d.data().strava_id)));

  const batch = writeBatch(db);
  let savedCount = 0;

  for (const act of activities) {
    const activityId = String(act.id || `${act.athlete?.firstname}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);

    // Kiểm tra cái nào đã tồn tại thì bỏ qua, chỉ thêm cái mới
    if (!existingSet.has(activityId)) {
      const docRef = doc(collection(db, "activities"));
      batch.set(docRef, {
        strava_id: activityId,
        athlete_name: `${act.athlete?.firstname || ''} ${act.athlete?.lastname || ''}`.trim() || 'Thành Viên',
        name: act.name || 'Hoạt động chạy bộ',
        distance: act.distance ? (act.distance / 1000).toFixed(2) : '0.00',
        moving_time: act.moving_time || 0,
        total_elevation_gain: act.total_elevation_gain || 0,
        start_date: act.start_date || new Date().toISOString(),
        pace: formatPace(act.average_speed),
        type: act.type || 'Run',
        created_at: serverTimestamp()
      });
      savedCount++;
      existingSet.add(activityId);
    }
  }

  if (savedCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Hoạt động: ${activities.length} tìm thấy, ${savedCount} mới.`);
  return savedCount;
}

// ─── 2. Sync Members ────────────────────────────────
async function syncMembers(accessToken) {
  console.log("👥 Đang kéo danh sách thành viên (hỗ trợ phân trang)...");
  try {
    let allMembers = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(`https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/members?per_page=200&page=${page}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const members = response.data;
      
      if (Array.isArray(members) && members.length > 0) {
        allMembers = allMembers.concat(members);
        page++;
      } else {
        hasMore = false;
      }
    }

    if (allMembers.length === 0) return;

    let batch = writeBatch(db);
    // Xóa members cũ
    const oldSnap = await getDocs(collection(db, "members"));
    let deleteCount = 0;
    
    // Xóa 500 document mỗi batch (giới hạn của Firestore)
    for (const d of oldSnap.docs) {
      batch.delete(d.ref);
      deleteCount++;
      if (deleteCount === 500) {
        await batch.commit();
        batch = writeBatch(db);
        deleteCount = 0;
      }
    }
    if (deleteCount > 0) await batch.commit();

    // Thêm members mới (mỗi batch 500)
    batch = writeBatch(db);
    let addCount = 0;
    let totalAdded = 0;

    for (let i = 0; i < allMembers.length; i++) {
       const m = allMembers[i];
       const name = `${m.firstname || ''} ${m.lastname || ''}`.trim();
       const docRef = doc(db, "members", `member_${i}`);
       batch.set(docRef, {
         name: name || 'Thành viên',
         firstname: m.firstname || '',
         lastname: m.lastname || '',
         membership: m.membership || 'member',
         admin: m.admin || false,
         owner: m.owner || false,
         profile: m.profile || '',
         profile_medium: m.profile_medium || '',
       });
       
       addCount++;
       totalAdded++;

       if (addCount === 500) {
         await batch.commit();
         batch = writeBatch(db);
         addCount = 0;
       }
    }
    
    if (addCount > 0) await batch.commit();
    console.log(`✅ Đã đồng bộ toàn bộ ${totalAdded} thành viên.`);
  } catch (e) {
    console.warn("⚠️ Không thể lấy danh sách thành viên:", e.response?.data?.message || e.message);
  }
}

// ─── 3. Sync Club Info ──────────────────────────────
async function syncClubInfo(accessToken) {
  console.log("🏠 Đang lấy thông tin CLB...");
  try {
    const response = await axios.get(`https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const club = response.data;
    await setDoc(doc(db, "club_info", "main"), {
      name: club.name || 'Long An Runners',
      member_count: club.member_count || 0,
      city: club.city || '',
      state: club.state || '',
      country: club.country || '',
      sport_type: club.sport_type || 'running',
      description: club.description || '',
      profile: club.profile || '',
      profile_medium: club.profile_medium || '',
      cover_photo: club.cover_photo || '',
      cover_photo_small: club.cover_photo_small || '',
      url: club.url || '',
      updated_at: serverTimestamp()
    });
    console.log(`✅ CLB: ${club.name} (${club.member_count} thành viên)`);
  } catch (e) {
    console.warn("⚠️ Không thể lấy thông tin CLB:", e.response?.data?.message || e.message);
  }
}

// ─── 4. Calculate Leaderboards ──────────────────────
async function calculateLeaderboards() {
  console.log("🏆 Tính toán Bảng xếp hạng...");
  const snap = await getDocs(collection(db, "activities"));
  const activities = snap.docs.map(d => d.data());
  if (activities.length === 0) { console.log("⚠️ Chưa có hoạt động."); return; }

  const startWeek = getStartOfPeriod('week');
  const startLastWeek = getStartOfPeriod('last_week');
  const endLastWeek = getEndOfLastWeek();
  const startMonth = getStartOfPeriod('month');

  const stats = { week: {}, last_week: {}, month: {} };

  activities.forEach(act => {
    const t = new Date(act.start_date).getTime();
    if (!act.athlete_name) return;
    const name = act.athlete_name;
    const km = parseFloat(act.distance) || 0;
    const time = act.moving_time || 0;
    const elev = act.total_elevation_gain || 0;

    const addTo = (type) => {
      if (!stats[type][name]) stats[type][name] = { km: 0, time: 0, runs: 0, elev: 0, longest: 0 };
      stats[type][name].km += km;
      stats[type][name].time += time;
      stats[type][name].runs += 1;
      stats[type][name].elev += elev;
      if (km > stats[type][name].longest) stats[type][name].longest = km;
    };

    if (t >= startWeek) addTo('week');
    if (t >= startLastWeek && t <= endLastWeek) addTo('last_week');
    if (t >= startMonth) addTo('month');
  });

  const batch = writeBatch(db);

  // Clear old leaderboard
  const oldSnap = await getDocs(collection(db, "leaderboard"));
  oldSnap.forEach(d => batch.delete(d.ref));

  let total = 0;

  ['week', 'last_week', 'month'].forEach(type => {
    const arr = Object.entries(stats[type]).map(([name, d]) => {
      const mps = d.time > 0 ? (d.km * 1000) / d.time : 0;
      return {
        type, name,
        km: parseFloat(d.km.toFixed(2)),
        runs: d.runs,
        time: d.time,
        time_formatted: formatDuration(d.time),
        pace: formatPace(mps),
        elev: Math.round(d.elev),
        longest: parseFloat(d.longest.toFixed(2)),
        badge: d.km > 50 ? 'Elite' : d.km > 20 ? 'Pro' : 'Active',
        _sort: d.km
      };
    }).sort((a, b) => b._sort - a._sort);

    arr.forEach((r, i) => {
      r.rank = i + 1;
      r.avatar = r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : '🏃';
      delete r._sort;
      batch.set(doc(db, "leaderboard", `${type}_${r.name.replace(/\s+/g, '_')}`), r);
      total++;
    });
  });

  // Leaders tuần trước (Top 3 cho 3 hạng mục: Quãng đường, Thời gian, Leo dốc)
  const lastWeekArr = Object.entries(stats['last_week']).map(([name, d]) => ({ name, ...d }));
  const topDistance = [...lastWeekArr].sort((a, b) => b.km - a.km).slice(0, 3);
  const topTime = [...lastWeekArr].sort((a, b) => b.time - a.time).slice(0, 3);
  const topElev = [...lastWeekArr].sort((a, b) => b.elev - a.elev).slice(0, 3);

  const leaders = {
    distance: topDistance.map((r, i) => ({ rank: i + 1, name: r.name, value: `${r.km.toFixed(1)} km` })),
    time: topTime.map((r, i) => ({ rank: i + 1, name: r.name, value: formatDuration(r.time) })),
    elevation: topElev.map((r, i) => ({ rank: i + 1, name: r.name, value: `${Math.round(r.elev)} m` })),
  };
  batch.set(doc(db, "leaders", "last_week"), { ...leaders, updated_at: serverTimestamp() });

  await batch.commit();
  console.log(`✅ Bảng xếp hạng: ${total} vị trí (tuần này + tuần trước + tháng). Leaders tuần trước đã cập nhật.`);
}

// ─── Main: Chế độ tự động chạy vòng lặp ──────────────
async function syncLoop() {
  try {
    const token = await getFreshAccessToken();
    await syncActivities(token);
    await syncMembers(token);
    await syncClubInfo(token);
    await calculateLeaderboards();
    console.log(`\n🎉 Hoàn tất đồng bộ lúc ${new Date().toLocaleString('vi-VN')}`);
  } catch (error) {
    console.error("❌ Lỗi:", error.response?.data || error.message);
  }
}

async function main() {
  console.log("🚀 Bắt đầu Service Đồng Bộ Tự Động...");

  // Chạy lần đầu ngay lập tức
  await syncLoop();

  // Đặt lịch lặp lại sau mỗi 10 phút để liên tục lấy dữ liệu mới
  const SYNC_INTERVAL_MINUTES = 60;
  setInterval(syncLoop, SYNC_INTERVAL_MINUTES * 60 * 1000);

  console.log(`⏳ Đã lên lịch tự động chạy lại mỗi ${SYNC_INTERVAL_MINUTES} phút. Giữ Terminal này mở để duy trì...`);
}

main();
