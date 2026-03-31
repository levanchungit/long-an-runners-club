import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';

export default function useClubInfo() {
  const [clubInfo, setClubInfo] = useState({
    name: 'Long An Runners',
    member_count: 0,
    city: 'Long An',
    state: 'Long An',
    country: 'Vietnam',
    sport_type: 'running',
    description: 'Nơi quy tụ anh em Brunner Long An',
    profile: '',
    profile_medium: '',
    cover_photo: '',
    cover_photo_small: '',
    url: 'longanrunner',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig || !db) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'club_info', 'main'), (snap) => {
      if (snap.exists()) {
        setClubInfo((prev) => ({ ...prev, ...snap.data() }));
      }
      setLoading(false);
    }, (err) => {
      console.warn("ClubInfo error:", err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { clubInfo, loading };
}
