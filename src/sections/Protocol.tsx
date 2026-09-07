import { useState } from 'react';
import { PROTOCOL_FAQ } from '../data/site';
import { useReveal } from '../hooks/instruments';

/** CP 07 — BRIEFING. Exam-day protocol, candidate questions. */
export default function Protocol() {
  const revealRef = useReveal<HTMLElement>();
  const [open, setOpen] = useState(0);

  return (
    <section id="briefing" ref={revealRef} className="relative py-28 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="pad-rail px-5 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 reveal">
          <div className="lg:sticky lg:top-24">
            <p className="micro mb-4 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
              <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
              CP 07 — Briefing
            </p>
            <h2 className="display font-bold" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              KNOW BEFORE
              <br />
              YOU <span style={{ color: 'var(--signal)' }}>GO</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed max-w-xs" style={{ color: 'var(--mute)' }}>
              The questions every candidate asks — answered the way we&apos;d answer them at the
              check-in desk.
            </p>
            <p className="mono text-[10px] uppercase tracking-[0.18em] mt-8" style={{ color: 'var(--faint)' }}>
              {String(PROTOCOL_FAQ.length).padStart(2, '0')} entries · updated exam-day protocol
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 reveal">
          {PROTOCOL_FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left py-6 flex items-baseline gap-5 group"
                  aria-expanded={isOpen}
                >
                  <span className="mono text-[10px] tabular-nums shrink-0" style={{ color: isOpen ? 'var(--signal)' : 'var(--faint)' }}>
                    P-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex-1 text-lg md:text-xl font-medium transition-colors duration-300"
                    style={{ color: isOpen ? 'var(--ink)' : 'var(--mute)' }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="mono text-sm shrink-0 transition-transform duration-300"
                    style={{
                      color: 'var(--signal)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isOpen ? 220 : 0,
                    opacity: isOpen ? 1 : 0,
                    transitionTimingFunction: 'var(--ease-reveal)',
                  }}
                >
                  <p className="pb-7 pl-12 md:pl-14 pr-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--mute)' }}>
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </div>
    </section>
  );
}
