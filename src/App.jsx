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
import Membership from './components/Membership';
import Coaches from './components/Coaches';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(
      '.animate-on-scroll, .animate-slide-left, .animate-slide-right'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
      <Membership />
      <Coaches />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
