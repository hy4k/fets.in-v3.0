import { CHECKPOINTS } from '../data/site';
import { useClock, formatClock, usePageProgress, useActiveCheckpoint } from '../hooks/instruments';

const IDS = CHECKPOINTS.map((c) => c.id);

/**
 * SessionRail — the site's only persistent chrome.
 * Not a menu: a live session instrument. Clock, checkpoint readout, progress dial.
 */
export default function SessionRail() {
  const now = useClock();
  const progress = usePageProgress();
  const active = useActiveCheckpoint(IDS);
  const cp = CHECKPOINTS[active];

  const R = 21;
  const CIRC = 2 * Math.PI * R;

  return (
    <>
      {/* ——— desktop rail ——— */}
      <aside
        className="hidden md:flex fixed top-0 right-0 h-full z-50 flex-col items-center justify-between py-5"
        style={{
          width: 'var(--rail-w)',
          background: 'rgba(10,11,13,0.82)',
          backdropFilter: 'blur(10px)',
          borderLeft: '1px solid var(--line)',
        }}
        aria-hidden
      >
        {/* mark */}
        <a
          href="#airlock"
          className="flex flex-col items-center gap-2 no-underline"
          title="FETS — Forun Testing & Educational Services"
        >
          <span
            className="flex items-center justify-center rounded-[3px] px-1.5 py-1"
            style={{ background: '#f5f1e4', border: '1px solid var(--line)', width: 46 }}
          >
            <img
              src="/images/brand/forun.png"
              alt="Forun"
              className="w-full h-auto object-contain"
            />
          </span>
          <span className="micro" style={{ color: 'var(--faint)', fontSize: 8 }}>
            FETS
          </span>
        </a>

        {/* checkpoint readout, vertical */}
        <div className="flex-1 flex items-center justify-center py-6">
          <div
            className="flex items-center gap-4"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            <span className="micro" style={{ color: 'var(--faint)' }}>
              SESSION / CP {cp.cp}—08
            </span>
            <span
              className="mono text-xs font-medium tracking-[0.3em] uppercase transition-colors duration-500"
              style={{ color: 'var(--signal)' }}
            >
              {cp.label}
            </span>
          </div>
        </div>

        {/* progress dial + clock */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative" style={{ width: 52, height: 52 }}>
            <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
              <circle cx="26" cy="26" r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" />
              <circle
                cx="26"
                cy="26"
                r={R}
                fill="none"
                stroke="var(--signal)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * (1 - progress)}
                style={{ transition: 'stroke-dashoffset 0.15s linear' }}
              />
            </svg>
            <span
              className="mono absolute inset-0 flex items-center justify-center text-[9px]"
              style={{ color: 'var(--mute)' }}
            >
              {String(Math.round(progress * 100)).padStart(3, '0')}
            </span>
          </div>
          <span
            className="mono text-[10px] tabular-nums"
            style={{ color: 'var(--mute)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {formatClock(now)}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full dot-pulse"
            style={{ background: 'var(--signal)' }}
          />
        </div>
      </aside>

      {/* ——— mobile instrument strip (bottom, not a nav) ——— */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2"
        style={{
          background: 'rgba(10,11,13,0.88)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--line)',
        }}
        aria-hidden
      >
        <span className="micro" style={{ color: 'var(--signal)' }}>
          CP {cp.cp} · {cp.label}
        </span>
        <div className="flex-1 mx-4 h-px relative" style={{ background: 'var(--line)' }}>
          <div
            className="absolute left-0 top-0 h-px"
            style={{ width: `${progress * 100}%`, background: 'var(--signal)' }}
          />
        </div>
        <span className="mono text-[10px] tabular-nums" style={{ color: 'var(--mute)' }}>
          {formatClock(now)}
        </span>
      </div>
    </>
  );
}
