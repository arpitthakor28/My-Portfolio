"use client";

import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = window.innerWidth;
        let H = window.innerHeight;
        let particles: Particle[] = [];
        let scrollY = 0;
        let lastScrollY = 0;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            r: number;
            alpha: number;

            constructor() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.z = Math.random() * 2 + 0.2;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.r = Math.random() * 1.5 + 0.2;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            reset() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
            }

            update(scrollDelta: number) {
                this.x += this.vx + (scrollDelta * 0.005 * this.z);
                this.y += this.vy;
                
                if (this.x < 0) this.x = W;
                if (this.x > W) this.x = 0;
                if (this.y < 0) this.y = H;
                if (this.y > H) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * this.z, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(182, 98, 75, ${this.alpha * this.z})`; // Brick color particles
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);

        const animate = () => {
            ctx.clearRect(0, 0, W, H);
            
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;

            particles.forEach((p) => {
                p.update(scrollDelta);
                p.draw();
            });

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(182, 98, 75, ${0.05 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
        />
    );
}
