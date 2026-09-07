import { useEffect, useRef, useState } from 'react';
import { useSectionProgress } from '../hooks/instruments';

const STEPS = [
  {
    n: '01',
    code: 'REPORT',
    title: 'Report 30 minutes early',
    body: 'Coffee, seating, and a check-in desk that already knows your name. Your confirmation email opens the door.',
    meta: 'LOBBY / FLOOR ACCESS',
  },
  {
    n: '02',
    code: 'VERIFY',
    title: 'ID + biometric capture',
    body: 'Government photo ID, fingerprint and photograph matched to your registration — the same rigour as any Prometric centre on earth.',
    meta: 'ID · FINGERPRINT · PHOTO',
  },
  {
    n: '03',
    code: 'SECURE',
    title: 'Everything goes in a locker',
    body: 'Phones, watches, notes, bags — sealed in a numbered locker under camera coverage until the moment you submit.',
    meta: 'NUMBERED LOCKERS / CCTV',
  },
  {
    n: '04',
    code: 'SEAT',
    title: 'Your own partitioned station',
    body: 'One candidate per bay. Ergonomic seating, current-generation hardware, a noise-managed floor built for focus.',
    meta: 'PRIVATE BAY / ERGO SEATING',
  },
  {
    n: '05',
    code: 'TEST',
    title: 'Invigilated. Recorded. Calm.',
    body: 'Trained invigilators, continuous recording, climate control. The only variable left in the room is you.',
    meta: 'INVIGILATED / 24°C / QUIET',
  },
  {
    n: '06',
    code: 'SUBMIT',
    title: 'Confirmed before you stand',
    body: 'Responses upload and verify at the station before you leave. Results then follow your exam provider\u2019s timeline.',
    meta: 'UPLOAD CONFIRMED',
  },
];

/** CP 01 — PROTOCOL. Scroll-drawn serpentine spine through six checkpoints. */
export default function Journey() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [len, setLen] = useState(1);
  const [dot, setDot] = useState({ x: 50, y: 10 });
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);

  const NODE_FRACTIONS = [0.04, 0.22, 0.4, 0.58, 0.76, 0.94];

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    setLen(L);
    setNodes(
      NODE_FRACTIONS.map((f) => {
        const pt = p.getPointAtLength(L * f);
        return { x: pt.x, y: pt.y };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const p = pathRef.current;
    if (!p || len <= 1) return;
    const pt = p.getPointAtLength(len * progress);
    setDot({ x: pt.x, y: pt.y });
  }, [progress, len]);

  const activeIdx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
  const step = STEPS[activeIdx];

  return (
    <section id="protocol" ref={ref} className="relative" style={{ height: '480vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ background: 'var(--bg)' }}>
        {/* section label */}
        <div className="pad-rail px-5 md:px-10 pt-6 flex items-center justify-between">
          <p className="micro" style={{ color: 'var(--faint)' }}>
            CP 01 — Protocol · The exam-day journey
          </p>
          <p className="micro tabular-nums" style={{ color: 'var(--signal)' }}>
            CHECK-IN {String(Math.round(progress * 100)).padStart(3, '0')}%
          </p>
        </div>

        <div className="relative flex-1 pad-rail px-5 md:px-10 grid grid-cols-12 items-center">
          {/* serpentine spine */}
          <div className="col-span-3 md:col-span-4 h-full flex items-center justify-center">
            <svg
              viewBox="0 0 100 1000"
              className="h-[72vh] w-full max-w-[140px]"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              {/* rail */}
              <path
                d="M 50 10 C 86 130, 14 240, 50 350 C 86 460, 14 560, 50 670 C 86 780, 20 880, 50 990"
                stroke="var(--line)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* drawn signal line */}
              <path
                ref={pathRef}
                d="M 50 10 C 86 130, 14 240, 50 350 C 86 460, 14 560, 50 670 C 86 780, 20 880, 50 990"
                stroke="var(--signal)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={len}
                strokeDashoffset={len * (1 - progress)}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,158,64,0.5))' }}
              />
              {/* node markers */}
              {nodes.map((pt, i) => {
                const reached = progress >= NODE_FRACTIONS[i] - 0.02;
                return (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    fill={reached ? 'var(--signal)' : 'var(--bg)'}
                    stroke={reached ? 'var(--signal)' : 'var(--line)'}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: 'stroke 0.4s, fill 0.4s' }}
                  />
                );
              })}
              {/* traveller */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="6"
                fill="var(--signal)"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,158,64,0.9))' }}
              />
            </svg>
          </div>

          {/* active checkpoint panel */}
          <div className="col-span-9 md:col-span-8 relative">
            <div key={step.n} className="step-in">
              <p className="micro mb-4" style={{ color: 'var(--signal)' }}>
                CHECKPOINT {step.n} / 06 — {step.code}
              </p>
              <div className="flex items-baseline gap-4 md:gap-8 flex-wrap">
                <span
                  className="display font-bold outline-text select-none"
                  style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
                  aria-hidden
                >
                  {step.n}
                </span>
                <h2
                  className="display font-bold max-w-[14ch]"
                  style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.6rem)', lineHeight: 1.02 }}
                >
                  {step.title}
                </h2>
              </div>
              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed" style={{ color: 'var(--mute)' }}>
                {step.body}
              </p>
              <p className="mono text-[10px] uppercase tracking-[0.2em] mt-6" style={{ color: 'var(--faint)' }}>
                {step.meta}
              </p>
            </div>

            {/* progress notches */}
            <div className="flex gap-1.5 mt-10">
              {STEPS.map((s, i) => (
                <span
                  key={s.n}
                  className="h-[3px] transition-all duration-500"
                  style={{
                    width: i === activeIdx ? 42 : 16,
                    background: i <= activeIdx ? 'var(--signal)' : 'var(--line)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .step-in { animation: stepIn 0.55s var(--ease-reveal) both; }
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
