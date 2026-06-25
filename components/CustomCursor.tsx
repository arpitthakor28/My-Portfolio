"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 600, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 30 });

  // Trailing ring is slower
  const trailX = useSpring(0, { stiffness: 120, damping: 20 });
  const trailY = useSpring(0, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    trailX.set(e.clientX);
    trailY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [mouseX, mouseY, trailX, trailY, visible]);

  useEffect(() => {
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') || t.closest('[role="button"]');
      setIsHovered(!!interactive);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Core dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX, y: mouseY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          opacity: visible ? 1 : 0,
          backgroundColor: isHovered ? '#E67E22' : '#B6624B',
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: isHovered ? '#E67E22' : '#B6624B',
          }}
        />
      </motion.div>

      {/* Trailing morphing ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        initial={{
          width: 32, height: 32,
          borderColor: 'rgba(182,98,75,0.4)',
          backgroundColor: 'rgba(0,0,0,0)',
          opacity: 0, borderRadius: '50%',
        }}
        animate={{
          width: isHovered ? 52 : isClicking ? 20 : 32,
          height: isHovered ? 52 : isClicking ? 20 : 32,
          borderColor: isHovered ? 'rgba(230,126,34,0.7)' : 'rgba(182,98,75,0.4)',
          backgroundColor: isHovered ? 'rgba(230,126,34,0.08)' : 'rgba(0,0,0,0)',
          opacity: visible ? 1 : 0,
          borderRadius: isClicking ? '8px' : '50%',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          x: trailX, y: trailY,
          translateX: '-50%', translateY: '-50%',
          border: '1.5px solid',
        }}
      />
    </>
  );
}

