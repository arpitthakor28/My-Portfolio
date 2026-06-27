"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const canvasRef = useRef(null);
  const state = useRef({
    mx: 0,
    my: 0,
    dot: { x: 0, y: 0 },
    ring: { x: 0, y: 0 },
    vx: 0,
    vy: 0,
    prevRingX: 0,
    prevRingY: 0,
    clicking: false,
    clickPulse: 0,
    dotScale: 1,
    ringScale: 1,
    targetDotScale: 1,
    targetRingScale: 1,
    trail: [],
    initialized: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const s = state.current;

      if (!s.initialized) {
        s.dot.x = s.mx; s.dot.y = s.my;
        s.ring.x = s.mx; s.ring.y = s.my;
        s.prevRingX = s.mx; s.prevRingY = s.my;
        s.initialized = true;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move dot (fast)
      s.dot.x = lerp(s.dot.x, s.mx, 0.28);
      s.dot.y = lerp(s.dot.y, s.my, 0.28);

      // Move ring (spring physics)
      const SPRING = 0.18, DAMP = 0.72;
      s.vx += (s.mx - s.ring.x) * SPRING;
      s.vy += (s.my - s.ring.y) * SPRING;
      s.vx *= DAMP; s.vy *= DAMP;
      s.ring.x += s.vx; s.ring.y += s.vy;

      const rdx = s.ring.x - s.prevRingX;
      const rdy = s.ring.y - s.prevRingY;
      s.prevRingX = s.ring.x;
      s.prevRingY = s.ring.y;

      // Lerp scales
      s.dotScale = lerp(s.dotScale, s.targetDotScale, 0.12);
      s.ringScale = lerp(s.ringScale, s.targetRingScale, 0.10);
      s.clickPulse = lerp(s.clickPulse, 0, 0.08);

      // Trail
      s.trail.push({ x: s.ring.x, y: s.ring.y });
      if (s.trail.length > 18) s.trail.shift();

      for (let i = 1; i < s.trail.length; i++) {
        const t = i / s.trail.length;
        ctx.save();
        ctx.globalAlpha = t * 0.12;
        ctx.beginPath();
        ctx.arc(s.trail[i].x, s.trail[i].y, 3 * t, 0, Math.PI * 2);
        ctx.fillStyle = "#7c6aff";
        ctx.fill();
        ctx.restore();
      }

      // Dashed connector when apart
      const lineDist = Math.sqrt((s.dot.x - s.ring.x) ** 2 + (s.dot.y - s.ring.y) ** 2);
      if (lineDist > 40) {
        ctx.save();
        ctx.globalAlpha = Math.min((lineDist - 40) / 120, 0.18);
        ctx.beginPath();
        ctx.moveTo(s.dot.x, s.dot.y);
        ctx.lineTo(s.ring.x, s.ring.y);
        ctx.strokeStyle = "#7c6aff";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.restore();
      }

      // Ring (squishes on velocity)
      const speed = Math.sqrt(rdx * rdx + rdy * rdy);
      const squeeze = Math.min(speed * 0.015, 0.28);
      const angle = Math.atan2(rdy, rdx);
      const rx = (20 + speed * 0.4) * s.ringScale * (1 + squeeze);
      const ry = 20 * s.ringScale * (1 - squeeze * 0.5);

      ctx.save();
      ctx.translate(s.ring.x, s.ring.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#b05a2a";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Click pulse
      if (s.clickPulse > 0.01) {
        ctx.save();
        ctx.globalAlpha = s.clickPulse * 0.35;
        ctx.translate(s.ring.x, s.ring.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * (1 + s.clickPulse * 0.6), ry * (1 + s.clickPulse * 0.6), 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#e06030";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Dot
      const dotR = 4 * s.dotScale;
      if (dotR > 0.2) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.dot.x, s.dot.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = "#f0eeff";
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      state.current.mx = e.clientX;
      state.current.my = e.clientY;
    };
    const onMouseDown = () => {
      state.current.clicking = true;
      state.current.clickPulse = 1;
    };
    const onMouseUp = () => { state.current.clicking = false; };

    const HOVER_SELECTORS = "a, button, [data-cursor-hover], h1, h2, h3, .project-card";
    const onMouseOver = (e) => {
      if (e.target?.closest(HOVER_SELECTORS)) {
        state.current.targetDotScale = 0.3;
        state.current.targetRingScale = 2.4;
      }
    };
    const onMouseOut = (e) => {
      if (e.target?.closest(HOVER_SELECTORS)) {
        state.current.targetDotScale = 1;
        state.current.targetRingScale = 1;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", () => { canvas.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { canvas.style.opacity = "1"; });

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "opacity 0.3s",
      }}
    />
  );
}
