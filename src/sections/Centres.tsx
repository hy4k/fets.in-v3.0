import { SITES } from '../data/site';
import { useReveal } from '../hooks/instruments';

/** CP 06 — SITES. Two centre dossiers, asymmetric. */
export default function Centres() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section id="sites" ref={revealRef} className="relative py-28 md:py-36" style={{ background: 'var(--panel)' }}>
      <div className="pad-rail px-5 md:px-10">
        <div className="mb-20 reveal">
          <p className="micro mb-4 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
            <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
            CP 06 — Sites
          </p>
          <h2 className="display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            TWO SITES<span style={{ color: 'var(--signal)' }}>.</span>
            <br />
            <span className="outline-text">ONE STANDARD.</span>
          </h2>
        </div>

        {SITES.map((s, i) => (
          <div
            key={s.id}
            className={`reveal grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${i > 0 ? 'mt-24' : ''}`}
          >
            {/* image block */}
            <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="scan-frame brackets" style={{ border: '1px solid var(--line)' }}>
                <div
                  className="flex items-center justify-between px-3 py-2 mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ borderBottom: '1px solid var(--line)', color: 'var(--faint)', background: 'var(--bg)' }}
                >
                  <span style={{ color: 'var(--signal)' }}>
                    SITE {s.id} — EXTERIOR ACCESS
                  </span>
                  <span className="tabular-nums">{s.hours}</span>
                </div>
                <img
                  src={s.image}
                  alt={`${s.name} — interior`}
                  className="w-full object-cover"
                  style={{ aspectRatio: '16/9', filter: 'saturate(0.88) contrast(1.05)' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* dossier */}
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <p className="micro mb-2" style={{ color: 'var(--faint)' }}>
                SITE {s.id} / {s.name}
              </p>
              <h3
                className="display font-bold outline-text leading-none mb-6"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 6.5rem)' }}
              >
                {s.city}
              </h3>

              <dl className="space-y-5">
                <div>
                  <dt className="mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--faint)' }}>
                    Address
                  </dt>
                  <dd className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                    {s.address}
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--faint)' }}>
                      Phone
                    </dt>
                    <dd>
                      <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="mono text-sm no-underline" style={{ color: 'var(--signal)' }}>
                        {s.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--faint)' }}>
                      Hours
                    </dt>
                    <dd className="mono text-sm tabular-nums" style={{ color: 'var(--ink)' }}>
                      {s.hours}
                    </dd>
                  </div>
                </div>
                <div>
                  <dt className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--faint)' }}>
                    Approach
                  </dt>
                  <dd className="space-y-1.5">
                    {s.directions.map((d) => (
                      <p key={d.mode} className="mono text-[11px] uppercase tracking-[0.12em] flex gap-3" style={{ color: 'var(--mute)' }}>
                        <span style={{ color: 'var(--signal)', minWidth: '5ch' }}>{d.mode}</span>
                        {d.detail}
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>

              <a
                href={s.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 mt-8 mono text-[11px] uppercase tracking-[0.2em] px-6 py-3 no-underline transition-all duration-300"
                style={{ border: '1px solid var(--signal)', color: 'var(--signal)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--signal)';
                  e.currentTarget.style.color = '#0a0b0d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--signal)';
                }}
              >
                Open in maps →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
