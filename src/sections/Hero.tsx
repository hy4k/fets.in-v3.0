import { useClock, formatClock, useShuffleText } from '../hooks/instruments';
import { TICKER_EXAMS, CONTACT } from '../data/site';

/** CP 00 — AIRLOCK. Full-viewport entry console. */
export default function Hero() {
  const now = useClock();
  const shuffled = useShuffleText(TICKER_EXAMS, 2200);

  return (
    <section
      id="airlock"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* ambient grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 520px at 78% 30%, rgba(255,158,64,0.07), transparent 65%), radial-gradient(700px 500px at 12% 85%, rgba(95,168,199,0.05), transparent 60%)',
        }}
      />

      {/* status strip — instrument, not navigation */}
      <header className="relative z-10 pad-rail px-5 md:px-10 pt-5 flex items-start justify-between mono text-[10px] md:text-[11px] uppercase tracking-[0.16em]">
        <div className="space-y-1" style={{ color: 'var(--mute)' }}>
          <p style={{ color: 'var(--ink)' }}>Forun Testing &amp; Educational Services</p>
          <p>Secure exam facility — Kerala, India</p>
          <p className="hidden sm:block">LAT 11.25 N · LON 75.77 E / LAT 10.02 N · LON 76.30 E</p>
        </div>
        <div className="text-right space-y-1">
          <p className="flex items-center justify-end gap-2" style={{ color: 'var(--mute)' }}>
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: 'var(--signal)' }} />
            Centres open
          </p>
          <p className="tabular-nums" style={{ color: 'var(--mute)' }}>
            T {formatClock(now)} IST
          </p>
          <p style={{ color: 'var(--faint)' }}>SESSION {now.getFullYear()}.{String(now.getMonth() + 1).padStart(2, '0')}</p>
        </div>
      </header>

      {/* main console */}
      <div className="relative z-10 flex-1 pad-rail px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-center py-14">
        <div className="lg:col-span-7">
          <p className="micro mb-6 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
            <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
            Authorized testing centre — Prometric · Pearson VUE · PSI
          </p>
          <h1 className="display font-bold" style={{ fontSize: 'clamp(3.4rem, 10.5vw, 9.5rem)' }}>
            SIT THE
            <br />
            <span style={{ color: 'var(--signal)' }}>REAL</span> THING
            <span style={{ color: 'var(--signal)' }}>.</span>
          </h1>
          <p
            className="mt-8 max-w-md text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--mute)' }}
          >
            Two exam-grade facilities in Calicut and Kochi — biometric check-in, private
            stations, invigilated floors. Built to global exam-day specification, open
            seven days a week.
          </p>

          {/* live seating readout */}
          <div
            className="mt-10 inline-flex items-center gap-4 px-4 py-3 brackets"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <span className="micro" style={{ color: 'var(--faint)' }}>
              Now seating
            </span>
            <span
              className="mono text-sm md:text-base font-medium tabular-nums"
              style={{ color: 'var(--signal)', minWidth: '12ch' }}
            >
              {shuffled}
            </span>
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: 'var(--signal)' }} />
          </div>
        </div>

        {/* surveillance-style facility monitor */}
        <div className="lg:col-span-5 hidden lg:block">
          <div
            className="scan-frame brackets relative"
            style={{ border: '1px solid var(--line)', background: 'var(--panel)' }}
          >
            <div
              className="flex items-center justify-between px-3 py-2 mono text-[10px] uppercase tracking-[0.18em]"
              style={{ borderBottom: '1px solid var(--line)', color: 'var(--faint)' }}
            >
              <span style={{ color: 'var(--signal)' }}>CAM 01 — RECEPTION</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: '#d85c46' }} />
                REC
              </span>
            </div>
            <img
              src="/images/facility/clt-reception.jpg"
              alt="FETS Calicut reception and candidate lounge"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3', filter: 'saturate(0.88) contrast(1.05)' }}
            />
            <div
              className="flex items-center justify-between px-3 py-2 mono text-[10px] uppercase tracking-[0.18em] tabular-nums"
              style={{ borderTop: '1px solid var(--line)', color: 'var(--faint)' }}
            >
              <span>CLT / FLOOR 04</span>
              <span>{formatClock(now)}</span>
            </div>
          </div>
          <p className="micro mt-3 text-right" style={{ color: 'var(--faint)' }}>
            FIG 00.1 — Kadooli Tower, West Nadakkavu
          </p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 pad-rail px-5 md:px-10 pb-24 md:pb-8 flex items-end justify-between">
        <a href="#protocol" className="group flex items-center gap-4 no-underline">
          <span
            className="mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: 'var(--mute)' }}
          >
            Scroll to begin check-in
          </span>
          <span className="relative block w-px h-12 overflow-hidden" style={{ background: 'var(--line)' }}>
            <span
              className="absolute top-0 left-0 w-px h-4"
              style={{
                background: 'var(--signal)',
                animation: 'drop 1.8s var(--ease-reveal) infinite',
              }}
            />
          </span>
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mono text-[10px] uppercase tracking-[0.22em] no-underline transition-colors"
          style={{ color: 'var(--faint)' }}
        >
          {CONTACT.email}
        </a>
      </div>

      <style>{`@keyframes drop { 0% { transform: translateY(-100%);} 100% { transform: translateY(300%);} }`}</style>
    </section>
  );
}
