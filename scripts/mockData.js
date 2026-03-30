import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const weeklyData = [
  { rank: 1, name: 'Nguyễn Văn Dũng', avatar: '🥇', km: 87.5, pace: "4'35\"", runs: 6, badge: 'Elite', type: 'week' },
  { rank: 2, name: 'Trần Minh Tuấn', avatar: '🥈', km: 72.3, pace: "5'10\"", runs: 5, badge: 'Pro', type: 'week' },
  { rank: 3, name: 'Lê Thị Hương', avatar: '🥉', km: 65.8, pace: "5'45\"", runs: 5, badge: 'Pro', type: 'week' },
];

const activitiesData = [
  { athlete_name: 'Nguyễn Văn Dũng', name: 'Morning Intensity Run', distance: 15.2, moving_time: 3600, start_date: new Date().toISOString(), pace: "4'35\"", avatar: 'https://i.pravatar.cc/150?u=1' },
  { athlete_name: 'Lê Thị Hương', name: 'Recovery Jog', distance: 5.5, moving_time: 1800, start_date: new Date(Date.now() - 86400000).toISOString(), pace: "6'00\"", avatar: 'https://i.pravatar.cc/150?u=2' },
];

async function seedData() {
  try {
    console.log("Seeding leaderboard...");
    for (const item of weeklyData) {
      await setDoc(doc(db, "leaderboard", `${item.type}_${item.rank}`), item);
    }
    
    console.log("Seeding activities...");
    for (const item of activitiesData) {
      await addDoc(collection(db, "activities"), item);
    }
    console.log("Seeding complete! Data is now on your Firebase.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

// Kiểm tra xem đã có API Key cấu hình chưa
if (!process.env.VITE_FIREBASE_API_KEY) {
  console.log("Vui lòng cấu hình VITE_FIREBASE_API_KEY trong file .env trước khi chạy script này.");
  process.exit(1);
} else {
  seedData();
}
