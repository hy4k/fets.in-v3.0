import { CONTACT, SITES } from '../data/site';
import { useReveal, useClock, formatClock } from '../hooks/instruments';

/** CP 08 — REPORT. Final contact block. */
export default function Footer() {
  const revealRef = useReveal<HTMLElement>();
  const now = useClock();

  return (
    <footer id="contact" ref={revealRef} className="relative overflow-hidden" style={{ background: 'var(--panel)' }}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(800px 400px at 50% 110%, rgba(255,158,64,0.08), transparent 70%)' }}
      />

      <div className="relative pad-rail px-5 md:px-10 pt-28 md:pt-36 pb-28 md:pb-10">
        <div className="reveal">
          <p className="micro mb-6 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
            <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
            CP 08 — Report
          </p>
          <h2 className="display font-bold" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
            REPORT
            <br />
            <span style={{ color: 'var(--signal)' }}>READY.</span>
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed" style={{ color: 'var(--mute)' }}>
            Seats, dates, test drives, group sittings — one message reaches the right desk.
            No queues, no portals, no waiting on hold.
          </p>
        </div>

        {/* direct lines */}
        <div className="grid md:grid-cols-3 gap-px mt-16 reveal" style={{ background: 'var(--line)' }}>
          <a
            href={`mailto:${CONTACT.email}`}
            className="group p-7 no-underline transition-colors duration-300 block"
            style={{ background: 'var(--panel)' }}
          >
            <p className="mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--faint)' }}>
              Write
            </p>
            <p className="mono text-lg md:text-xl font-medium transition-colors group-hover:text-[color:var(--signal)]" style={{ color: 'var(--ink)' }}>
              {CONTACT.email}
            </p>
            <p className="mono text-[10px] uppercase tracking-[0.18em] mt-4" style={{ color: 'var(--signal)' }}>
              Replies within one working day →
            </p>
          </a>
          <a
            href={`tel:${CONTACT.calicut.replace(/\s/g, '')}`}
            className="group p-7 no-underline transition-colors duration-300 block"
            style={{ background: 'var(--panel)' }}
          >
            <p className="mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--faint)' }}>
              Call — Calicut
            </p>
            <p className="mono text-lg md:text-xl font-medium tabular-nums transition-colors group-hover:text-[color:var(--signal)]" style={{ color: 'var(--ink)' }}>
              {CONTACT.calicut}
            </p>
            <p className="mono text-[10px] uppercase tracking-[0.18em] mt-4" style={{ color: 'var(--signal)' }}>
              Mon–Sun · 08:00–18:00 →
            </p>
          </a>
          <a
            href={`tel:${CONTACT.kochi.replace(/\s/g, '')}`}
            className="group p-7 no-underline transition-colors duration-300 block"
            style={{ background: 'var(--panel)' }}
          >
            <p className="mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--faint)' }}>
              Call — Kochi
            </p>
            <p className="mono text-lg md:text-xl font-medium tabular-nums transition-colors group-hover:text-[color:var(--signal)]" style={{ color: 'var(--ink)' }}>
              {CONTACT.kochi}
            </p>
            <p className="mono text-[10px] uppercase tracking-[0.18em] mt-4" style={{ color: 'var(--signal)' }}>
              Mon–Sun · 08:00–18:00 →
            </p>
          </a>
        </div>

        {/* bottom strip */}
        <div className="mt-16 pt-6 flex items-center justify-between flex-wrap gap-4 reveal" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="mono text-[10px] uppercase tracking-[0.16em] flex items-center gap-3" style={{ color: 'var(--faint)' }}>
            <span
              className="inline-flex items-center justify-center rounded-[3px] px-2 py-1"
              style={{ background: '#f5f1e4', width: 74 }}
            >
              <img src="/images/brand/forun.png" alt="Forun" className="w-full h-auto object-contain" />
            </span>
            © {now.getFullYear()} Forun Testing &amp; Educational Services — Calicut · Kochi
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.16em] tabular-nums hidden sm:block" style={{ color: 'var(--faint)' }}>
            LOCAL {formatClock(now)} IST
          </p>
          <a
            href="#airlock"
            className="mono text-[10px] uppercase tracking-[0.2em] no-underline transition-colors"
            style={{ color: 'var(--mute)' }}
          >
            ↑ Re-enter airlock
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 mono text-[9px] uppercase tracking-[0.16em]" style={{ color: 'var(--faint)' }}>
          {SITES.map((s) => (
            <span key={s.id}>
              {s.id} — {s.address}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
