import { useEffect, useState } from 'react';
import SessionRail from './sections/SessionRail';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Facility from './sections/Facility';
import ExamMatrix from './sections/ExamMatrix';
import TestDrive from './sections/TestDrive';
import Partners from './sections/Partners';
import Centres from './sections/Centres';
import Protocol from './sections/Protocol';
import Footer from './sections/Footer';
import { CHECKPOINTS } from './data/site';

/** Brief console boot overlay — then the session begins. */
function BootSequence({ done }: { done: () => void }) {
  const [line, setLine] = useState(0);
  const [gone, setGone] = useState(false);
  const lines = ['FETS SESSION INIT', 'FLOOR SYSTEMS · OK', 'STATIONS · OK', 'CLEARANCE VERIFIED'];

  useEffect(() => {
    const t1 = setInterval(() => setLine((l) => Math.min(l + 1, lines.length - 1)), 260);
    const t2 = setTimeout(() => setGone(true), 1350);
    const t3 = setTimeout(done, 1900);
    return () => {
      clearInterval(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
      style={{
        background: 'var(--bg)',
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? 'none' : 'auto',
      }}
      onClick={() => {
        setGone(true);
        setTimeout(done, 500);
      }}
      aria-hidden
    >
      <div className="mono text-[11px] uppercase tracking-[0.24em] space-y-2" style={{ color: 'var(--mute)' }}>
        {lines.slice(0, line + 1).map((l, i) => (
          <p key={l} style={{ color: i === lines.length - 1 ? 'var(--signal)' : undefined }}>
            <span style={{ color: 'var(--faint)' }}>{String(i).padStart(2, '0')} / </span>
            {l}
          </p>
        ))}
        <p className="pt-3" style={{ color: 'var(--faint)' }}>
          █
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);

  // keyboard checkpoint travel — ↑ / ↓ moves between checkpoints
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      e.preventDefault();
      const mid = window.scrollY + window.innerHeight * 0.42;
      let idx = 0;
      CHECKPOINTS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      const next = e.key === 'ArrowDown' ? Math.min(CHECKPOINTS.length - 1, idx + 1) : Math.max(0, idx - 1);
      document.getElementById(CHECKPOINTS[next].id)?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      {!booted && <BootSequence done={() => setBooted(true)} />}
      <SessionRail />
      <main>
        <Hero />
        <Journey />
        <Facility />
        <ExamMatrix />
        <TestDrive />
        <Partners />
        <Centres />
        <Protocol />
        <Footer />
      </main>
    </div>
  );
}
