import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ClubStats from './components/ClubStats';
import About from './components/About';
import LastWeekLeaders from './components/LastWeekLeaders';
import Leaderboard from './components/Leaderboard';
import RecentActivities from './components/RecentActivities';
import ClubMembers from './components/ClubMembers';
import Activities from './components/Activities';
import Events from './components/Events';
import Coaches from './components/Coaches';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const ANIM_SELECTOR = '.animate-on-scroll, .animate-slide-left, .animate-slide-right';

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe các element đã có sẵn
    const observeExisting = () => {
      document.querySelectorAll(ANIM_SELECTOR).forEach((el) => {
        intersectionObserver.observe(el);
      });
    };
    observeExisting();

    // Tự động observe element mới được thêm vào DOM (vd: sau khi fetch data xong)
    const mutationObserver = new MutationObserver(() => {
      observeExisting();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="font-montserrat">
      <Header />
      <Hero />
      <ClubStats />
      <About />

      {/* ─── Khu vực Strava Data ─── */}
      <LastWeekLeaders />
      <Leaderboard />
      <RecentActivities />
      <ClubMembers />

      {/* ─── Khu vực Club info ─── */}
      <Activities />
      <Events />
      <Coaches />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
