import { useState, useEffect } from 'react';

// Map màu cho các cự ly chạy
const DISTANCE_COLORS = {
  default: [
    'bg-green-100 text-green-700',
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-red-100 text-red-700',
    'bg-orange-100 text-orange-700',
  ],
};

/**
 * Parse CSV string đơn giản (hỗ trợ quoted fields có dấu phẩy và xuống dòng bên trong)
 */
function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const chars = text.split('');

  const fields = [];
  let row = [];

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const next = chars[i + 1];

    if (ch === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((ch === '\n' || (ch === '\r' && next === '\n')) && !inQuotes) {
      if (ch === '\r') i++;
      row.push(current.trim());
      rows.push(row);
      row = [];
      current = '';
    } else {
      current += ch;
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim());
    rows.push(row);
  }

  return rows;
}

/**
 * Chuyển chuỗi ngày tiếng Việt "24 Tháng 11, 2025" → Date object để so sánh
 */
const MONTH_MAP = {
  // Tiếng Việt có dấu
  'tháng 1': 1, 'tháng 01': 1,
  'tháng 2': 2, 'tháng 02': 2,
  'tháng 3': 3, 'tháng 03': 3,
  'tháng 4': 4, 'tháng 04': 4,
  'tháng 5': 5, 'tháng 05': 5,
  'tháng 6': 6, 'tháng 06': 6,
  'tháng 7': 7, 'tháng 07': 7,
  'tháng 8': 8, 'tháng 08': 8,
  'tháng 9': 9, 'tháng 09': 9,
  'tháng 10': 10, 'tháng 11': 11, 'tháng 12': 12,
  // ASCII không dấu (thang)
  'thang 1': 1, 'thang 01': 1,
  'thang 2': 2, 'thang 02': 2,
  'thang 3': 3, 'thang 03': 3,
  'thang 4': 4, 'thang 04': 4,
  'thang 5': 5, 'thang 05': 5,
  'thang 6': 6, 'thang 06': 6,
  'thang 7': 7, 'thang 07': 7,
  'thang 8': 8, 'thang 08': 8,
  'thang 9': 9, 'thang 09': 9,
  'thang 10': 10, 'thang 11': 11, 'thang 12': 12,
};

function parseVietnameseDate(dateStr) {
  if (!dateStr) return new Date(0);
  const lower = dateStr.toLowerCase().replace(',', '');
  // Hỗ trợ "24 tháng 11 2025" (có dấu) và "24 thang 11 2025" (không dấu)
  const match = lower.match(/(\d+)\s+(th[aá]ng\s+\d+)\s+(\d{4})/);
  if (!match) return new Date(0);
  const day = parseInt(match[1]);
  const month = MONTH_MAP[match[2].replace(/\s+/, ' ')] || 1;
  const year = parseInt(match[3]);
  return new Date(year, month - 1, day);
}

/**
 * Parse distances từ JSON string trong Google Sheets
 * Ví dụ: [{"km":"5KM","price":"200.000₫"},{"km":"10KM","price":"350.000₫"}]
 * Nếu không parse được → trả về mảng rỗng
 */
function parseDistances(distStr) {
  if (!distStr) return [];
  try {
    const arr = JSON.parse(distStr);
    return arr.map((d, idx) => ({
      km: d.km || '',
      price: d.price || '',
      color: DISTANCE_COLORS.default[idx % DISTANCE_COLORS.default.length],
    }));
  } catch {
    return [];
  }
}

/**
 * Hook chính: fetch data từ Google Sheets (CSV) và trả về danh sách giải chạy
 * đã được sắp xếp theo ngày mới nhất lên trước
 */
export function useEventsData() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_PUBLIC_URL_EXCEL_DATA;
    console.log(url)
    if (!url) {
      setError('Chưa cấu hình VITE_PUBLIC_URL_EXCEL_DATA trong .env');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const rows = parseCSV(text);
        if (rows.length < 2) {
          setRaces([]);
          return;
        }

        console.log("CO DATA", rows)

        // Row đầu tiên là header
        const headers = rows[0].map((h) => h.toLowerCase().trim());
        const nameIdx = headers.indexOf('name');
        const dateIdx = headers.indexOf('date');
        const locationIdx = headers.indexOf('location');
        const imageIdx = headers.indexOf('image');
        const distancesIdx = headers.indexOf('distances');
        const featuredIdx = headers.indexOf('featured');
        const registerUrlIdx = headers.indexOf('registerurl');

        const parsed = rows
          .slice(1)
          .filter((row) => row.some((cell) => cell !== '')) // bỏ dòng trống
          .map((row) => ({
            name: nameIdx >= 0 ? row[nameIdx] || '' : '',
            date: dateIdx >= 0 ? row[dateIdx] || '' : '',
            location: locationIdx >= 0 ? row[locationIdx] || '' : '',
            image: imageIdx >= 0 ? row[imageIdx] || '' : '',
            distances: distancesIdx >= 0 ? parseDistances(row[distancesIdx]) : [],
            featured: featuredIdx >= 0 ? row[featuredIdx]?.toLowerCase() === 'true' : false,
            registerUrl: registerUrlIdx >= 0 ? row[registerUrlIdx] || '#' : '#',
            _dateObj: parseVietnameseDate(dateIdx >= 0 ? row[dateIdx] || '' : ''),
          }))
          .filter((r) => r.name); // bỏ dòng không có tên

        // Sắp xếp: ngày mới nhất lên đầu
        parsed.sort((a, b) => b._dateObj - a._dateObj);

        setRaces(parsed);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { races, loading, error };
}
