/* AnimatedBackground.jsx
   ----------------------------------------------------------
   Decorative full-bleed background with drifting blurred orbs.
   - Pure CSS keyframe drift for ambient motion (GPU-accelerated).
   - JS subscribes to pointermove and applies a soft parallax
     offset to the orb layer using transform / translate3d.
   - Disabled on prefers-reduced-motion.
   ---------------------------------------------------------- */
const { useEffect, useRef } = React;

function AnimatedBackground({ parallax = 14 }) {
  const layerRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      targetRef.current.x = x * parallax;
      targetRef.current.y = y * parallax;
    };
    const tick = () => {
      const c = currentRef.current, t = targetRef.current;
      c.x += (t.x - c.x) * 0.06;
      c.y += (t.y - c.y) * 0.06;
      if (layerRef.current) {
        layerRef.current.style.transform =
          `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [parallax]);

  return (
    <div className="lt-bg" aria-hidden="true">
      <div className="lt-bg__orbs" ref={layerRef}>
        <div className="lt-bg__orb lt-bg__orb--violet"></div>
        <div className="lt-bg__orb lt-bg__orb--teal"></div>
        <div className="lt-bg__orb lt-bg__orb--blue"></div>
        <div className="lt-bg__orb lt-bg__orb--violet2"></div>
      </div>
      <div className="lt-bg__grain"></div>
    </div>
  );
}

window.AnimatedBackground = AnimatedBackground;
