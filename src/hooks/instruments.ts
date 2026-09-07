import { useEffect, useRef, useState } from 'react';

/** Live clock, updates every second. */
export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function formatClock(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/** Overall page scroll progress 0..1 */
export function usePageProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}

/** Progress 0..1 of scrolling through a tall section (for sticky scenes). */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return { ref, progress };
}

/** IntersectionObserver reveal — adds `.in` to `.reveal` descendants.
 *  Scroll fallback covers fast jumps where IO never sees an intersection frame. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll('.reveal'));
    const mark = (el: Element) => el.classList.add('in');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            mark(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
    const sweep = () => {
      targets.forEach((t) => {
        if (!t.classList.contains('in') && t.getBoundingClientRect().top < window.innerHeight * 0.92) {
          mark(t);
          io.unobserve(t);
        }
      });
    };
    window.addEventListener('scroll', sweep, { passive: true });
    sweep();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', sweep);
    };
  }, []);
  return ref;
}

/** Which checkpoint section is currently in view. */
export function useActiveCheckpoint(ids: readonly string[]) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.42;
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

/** Text shuffle — cycles glyphs before settling (departures-board effect). */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/·—';
export function useShuffleText(words: string[], holdMs = 2400) {
  const [text, setText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const target = words[index];
    let frame = 0;
    const totalFrames = 16;
    const scramble = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / totalFrames) * target.length);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (i < settled || target[i] === ' ') out += target[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(out);
      if (frame >= totalFrames) {
        clearInterval(scramble);
        setText(target);
      }
    }, 34);
    const hold = setTimeout(() => setIndex((i) => (i + 1) % words.length), holdMs);
    return () => {
      clearInterval(scramble);
      clearTimeout(hold);
    };
  }, [index, words, holdMs]);
  return text;
}
