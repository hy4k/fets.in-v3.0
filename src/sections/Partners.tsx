import { AUTHORIZATIONS } from '../data/site';
import { useReveal } from '../hooks/instruments';

/** CP 05 — CLEARANCE. Authorization ledger. */
export default function Partners() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section id="clearance" ref={revealRef} className="relative py-28 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="pad-rail px-5 md:px-10">
        <div className="mb-14 reveal">
          <p className="micro mb-4 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
            <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
            CP 05 — Clearance
          </p>
          <h2 className="display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            CLEARED TO <span className="outline-text">ADMINISTER</span>
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: 'var(--mute)' }}>
            FETS operates under formal authorization from the world&apos;s largest testing
            networks. Every session is delivered to the provider&apos;s own security and
            hardware specification — audited, not claimed.
          </p>
        </div>

        <div className="reveal">
          {AUTHORIZATIONS.map((a, i) => (
            <div
              key={a.name}
              className="group grid grid-cols-12 items-baseline gap-y-1 px-2 md:px-4 py-5 transition-colors duration-300"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="mono text-[10px] col-span-2 md:col-span-1 tabular-nums" style={{ color: 'var(--faint)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="col-span-10 md:col-span-5 display font-bold transition-all duration-300 group-hover:translate-x-2"
                style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2.1rem)', transitionTimingFunction: 'var(--ease-reveal)' }}
              >
                {a.name}
              </span>
              <span
                className="mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] col-span-8 col-start-3 md:col-span-4 md:col-start-auto"
                style={{ color: 'var(--mute)' }}
              >
                {a.scope}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.16em] col-span-2 text-right flex items-center justify-end gap-2" style={{ color: 'var(--pass)' }}>
                <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: 'var(--pass)' }} />
                {a.status}
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </div>
    </section>
  );
}
