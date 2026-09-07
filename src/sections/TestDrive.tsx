import { SIMULATIONS, CONTACT } from '../data/site';
import { useReveal } from '../hooks/instruments';

/** CP 04 — SIMULATION. Exam Test Drive: rehearse the real session. No prices, no booking form. */
export default function TestDrive() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section id="simulation" ref={revealRef} className="relative py-28 md:py-36" style={{ background: 'var(--panel)' }}>
      <div className="pad-rail px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7 reveal">
            <p className="micro mb-4 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
              <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
              CP 04 — Simulation
            </p>
            <h2 className="display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
              REHEARSE THE
              <br />
              <span style={{ color: 'var(--signal)' }}>REAL ROOM</span>
            </h2>
          </div>
          <div className="lg:col-span-5 reveal">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--mute)' }}>
              Exam Test Drive puts you in an actual seat, on the actual machines, under actual
              timing — before the day it counts. Walk out with a performance readout and a
              plan, not just a score.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          {SIMULATIONS.map((s, i) => (
            <article
              key={s.code}
              className="reveal group relative p-7 md:p-9 flex flex-col transition-colors duration-500"
              style={{ background: 'var(--panel)', transitionDelay: `${i * 90}ms` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--panel-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--panel)')}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  {s.logo && (
                    <span
                      className="flex items-center justify-center h-9 px-2.5 rounded-[4px]"
                      style={{ background: '#f5f1e4', border: '1px solid var(--line)' }}
                    >
                      <img
                        src={s.logo}
                        alt={`${s.name} programme mark`}
                        className="max-h-5 max-w-[76px] w-auto object-contain"
                      />
                    </span>
                  )}
                  <span className="mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--faint)' }}>
                    {s.code}
                  </span>
                </div>
                <span
                  className="mono text-[10px] uppercase tracking-[0.2em] tabular-nums px-2 py-1"
                  style={{ border: '1px solid var(--line)', color: 'var(--signal)' }}
                >
                  {s.duration}
                </span>
              </div>

              <h3 className="display font-bold mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                {s.name}
              </h3>
              <p className="mono text-[11px] uppercase tracking-[0.14em] mb-8" style={{ color: 'var(--mute)' }}>
                {s.spec}
              </p>

              <ul className="space-y-3 flex-1">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--mute)' }}>
                    <span className="mono text-[10px] mt-[5px]" style={{ color: 'var(--signal)' }}>
                      ▸
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div
                className="mt-10 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'var(--signal)', transitionTimingFunction: 'var(--ease-reveal)' }}
              />
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between flex-wrap gap-4 reveal">
          <p className="mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--faint)' }}>
            Seats per simulation are limited by floor capacity
          </p>
          <a
            href={`mailto:${CONTACT.email}?subject=Exam%20Test%20Drive%20—%20seat%20request`}
            className="breathe mono text-[11px] uppercase tracking-[0.2em] px-6 py-3 no-underline font-medium"
            style={{ background: 'var(--signal)', color: '#0a0b0d' }}
          >
            Request a test-drive seat →
          </a>
        </div>
      </div>
    </section>
  );
}
