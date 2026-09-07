import { useState } from 'react';
import { EXAM_GROUPS } from '../data/site';
import { useReveal } from '../hooks/instruments';

const PARTNERS = ['ALL', ...EXAM_GROUPS.map((g) => g.partner)];

/** CP 03 — REGISTRY. The full exam catalogue as a technical ledger. */
export default function ExamMatrix() {
  const [filter, setFilter] = useState('ALL');
  const revealRef = useReveal<HTMLElement>();

  const groups = filter === 'ALL' ? EXAM_GROUPS : EXAM_GROUPS.filter((g) => g.partner === filter);
  const totalExams = EXAM_GROUPS.reduce((a, g) => a + g.rows.length, 0);

  return (
    <section id="registry" ref={revealRef} className="relative py-28 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="pad-rail px-5 md:px-10">
        {/* header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 reveal">
          <div>
            <p className="micro mb-4 flex items-center gap-3" style={{ color: 'var(--signal)' }}>
              <span className="inline-block w-8 h-px" style={{ background: 'var(--signal)' }} />
              CP 03 — Registry
            </p>
            <h2 className="display font-bold" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
              THE EXAM
              <br />
              <span className="outline-text">CATALOGUE</span>
            </h2>
          </div>
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-right leading-loose" style={{ color: 'var(--faint)' }}>
            {totalExams} programmes · 05 partners
            <br />
            02 sites · 07 days a week
          </p>
        </div>

        {/* partner filter chips */}
        <div className="flex flex-wrap gap-2 mb-10 reveal">
          {PARTNERS.map((p) => {
            const on = filter === p;
            return (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className="mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 transition-all duration-300"
                style={{
                  border: `1px solid ${on ? 'var(--signal)' : 'var(--line)'}`,
                  color: on ? '#0a0b0d' : 'var(--mute)',
                  background: on ? 'var(--signal)' : 'transparent',
                  boxShadow: on ? '0 0 18px rgba(255,158,64,0.25)' : 'none',
                }}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* ledger */}
        <div className="reveal">
          {/* column heads */}
          <div
            className="hidden md:grid grid-cols-12 px-4 py-2 mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--faint)', borderBottom: '1px solid var(--line)' }}
          >
            <span className="col-span-4">Examination</span>
            <span className="col-span-3">Awarding body</span>
            <span className="col-span-3">Format</span>
            <span className="col-span-2 text-right">Sites</span>
          </div>

          {groups.map((g) => (
            <div key={g.partner} className="mb-2">
              {/* partner band */}
              <div
                className="flex items-center justify-between px-4 py-3 mt-8"
                style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderBottom: 'none' }}
              >
                <span className="mono text-xs uppercase tracking-[0.22em] font-medium" style={{ color: 'var(--ink)' }}>
                  {g.partner}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--signal)' }}>
                  {g.role}
                </span>
              </div>
              {/* rows */}
              {g.rows.map((r) => (
                <div
                  key={r.exam}
                  className="exam-row group relative grid grid-cols-2 md:grid-cols-12 gap-y-1 px-4 py-4 items-baseline"
                  style={{ borderBottom: '1px solid var(--line-soft)' }}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'var(--signal)', boxShadow: '0 0 12px rgba(255,158,64,0.6)' }}
                  />
                  <span className="col-span-2 md:col-span-4 text-sm md:text-base font-medium transition-colors duration-300 group-hover:text-[color:var(--signal)]">
                    {r.exam}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.12em] md:col-span-3" style={{ color: 'var(--mute)' }}>
                    {r.body}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.12em] md:col-span-3" style={{ color: 'var(--faint)' }}>
                    {r.format}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.12em] md:col-span-2 text-right" style={{ color: 'var(--faint)' }}>
                    {r.sites}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mono text-[10px] uppercase tracking-[0.18em] mt-8 reveal" style={{ color: 'var(--faint)' }}>
          CLT = Calicut · KCH = Kochi — Seat availability is confirmed directly with the centre.
        </p>
      </div>
    </section>
  );
}
