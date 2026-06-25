"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas({ frameCount = 75 }: { frameCount?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameId = i.toString().padStart(4, "0");
                    img.src = `/sequence/${frameId}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [frameCount]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Using Arpit's deep matte black background
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * (frameCount - 1))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (isLoaded) renderFrame(0);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-20">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
                        <div className="w-12 h-12 border-4 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin mb-4" />
                        <p className="text-sm font-medium tracking-widest uppercase text-slate-500">Initializing Experience...</p>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover opacity-60 md:opacity-100"
                />
                <Overlay scrollYProgress={scrollYProgress} />
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-accent-cyan" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-cyan">Scroll to Explore</span>
                </div>
            </div>
        </div>
    );
}
