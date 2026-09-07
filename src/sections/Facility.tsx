import { useSectionProgress } from '../hooks/instruments';
import { FACILITY } from '../data/site';

/** CP 02 — THE FLOOR. Scroll-crossfaded surveillance feed of the real facility. */
export default function Facility() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const n = FACILITY.length;
  const idx = Math.min(n - 1, Math.floor(progress * n));
  const shot = FACILITY[idx];

  return (
    <section id="floor" ref={ref} className="relative" style={{ height: `${n * 90 + 120}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: 'var(--panel)' }}>
        {/* header strip */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pad-rail px-5 md:px-10 py-5 flex items-center justify-between"
          style={{ background: 'linear-gradient(to bottom, rgba(10,11,13,0.9), transparent)' }}
        >
          <p className="micro" style={{ color: 'var(--faint)' }}>
            CP 02 — The Floor · Facility feed
          </p>
          <p className="micro flex items-center gap-2" style={{ color: 'var(--signal)' }}>
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: '#d85c46' }} />
            LIVE
          </p>
        </div>

        {/* image stack */}
        {FACILITY.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0, transitionTimingFunction: 'var(--ease-reveal)' }}
          >
            <img
              src={s.src}
              alt={s.title}
              className="w-full h-full object-cover"
              style={{
                filter: 'saturate(0.85) contrast(1.06) brightness(0.82)',
                transform: i === idx ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 6s var(--ease-reveal)',
              }}
            />
            {/* vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,11,13,0.94) 0%, rgba(10,11,13,0.25) 45%, rgba(10,11,13,0.35) 100%)',
              }}
            />
          </div>
        ))}

        {/* HUD frame corners */}
        <div className="absolute inset-4 md:inset-6 pointer-events-none z-20" aria-hidden>
          <span className="absolute top-0 left-0 w-5 h-5 border-t border-l" style={{ borderColor: 'var(--signal)' }} />
          <span className="absolute top-0 right-0 w-5 h-5 border-t border-r" style={{ borderColor: 'var(--signal)' }} />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l" style={{ borderColor: 'var(--signal)' }} />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r" style={{ borderColor: 'var(--signal)' }} />
        </div>

        {/* caption + counter */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pad-rail px-5 md:px-10 pb-16 md:pb-12">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div key={shot.src} className="step-in max-w-xl">
              <p className="micro mb-2" style={{ color: 'var(--signal)' }}>
                {shot.cam} — {shot.site}
              </p>
              <h3 className="display font-bold" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)' }}>
                {shot.title}
              </h3>
              <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--mute)' }}>
                {shot.desc}
              </p>
            </div>
            <div className="text-right">
              <p
                className="display font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', color: 'var(--ink)' }}
              >
                {String(idx + 1).padStart(2, '0')}
                <span style={{ color: 'var(--faint)', fontSize: '0.45em' }}> / {String(n).padStart(2, '0')}</span>
              </p>
              {/* segment notches */}
              <div className="flex gap-1 mt-3 justify-end">
                {FACILITY.map((s, i) => (
                  <span
                    key={s.src}
                    className="h-[3px] transition-all duration-500"
                    style={{
                      width: i === idx ? 34 : 12,
                      background: i <= idx ? 'var(--signal)' : 'var(--line)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .step-in { animation: stepIn 0.55s var(--ease-reveal) both; }
        @keyframes stepIn { from { opacity: 0; transform: translateY(22px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </section>
  );
}
