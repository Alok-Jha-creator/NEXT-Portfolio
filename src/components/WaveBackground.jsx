"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function WaveBackground({
  lines = 38,
  amplitude = 0.16,
  focusX = 0.68,
  className = "",
}) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let inView = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);

      // teal -> emerald -> halka purple (homepage ko theme sanga milne)
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(28,216,210,0.35)");
      grad.addColorStop(0.55, "rgba(0,191,143,0.7)");
      grad.addColorStop(1, "rgba(124,92,255,0.55)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;

      const amp = h * amplitude;
      const step = 8;

      for (let i = 0; i < lines; i++) {
        const t = i / (lines - 1);
        const baseY = h * (0.2 + t * 0.6);
        const phase = i * 0.17;

        // maajh ka line badi dekhine, kinara ka halka
        ctx.globalAlpha = 0.12 + 0.6 * Math.sin(t * Math.PI);

        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const nx = x / w;
          // focusX tira wave badi, baaki thau ma halka (text padhna sajilo)
          const env =
            0.15 + 0.85 * Math.exp(-Math.pow((nx - focusX) / 0.26, 2));

          const y =
            baseY +
            Math.sin(nx * 5.2 + time * 0.00035 + phase) * amp * env +
            Math.sin(nx * 9.5 - time * 0.00025 + phase * 1.7) * amp * 0.45 * env +
            Math.cos(nx * 2.4 + time * 0.0002 + i * 0.05) * amp * 0.6 * env;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      if (inView && !document.hidden) draw(time);
      raf = requestAnimationFrame(loop);
    };

    resize();

    if (reduce) {
      draw(0); // animation chahidaina bhae euta static frame matra
    } else {
      raf = requestAnimationFrame(loop);
    }

    // screen bhanda bahira / tab hidden huda animation roknu (battery ra speed ko lagi)
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [lines, amplitude, focusX, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        // kinara ma halka fade, tesaile section ko border dekhidaina
        maskImage:
          "radial-gradient(ellipse at 62% 50%, black 35%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 62% 50%, black 35%, transparent 78%)",
      }}
    />
  );
}