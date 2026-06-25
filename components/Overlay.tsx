"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

const Section = ({
    text,
    subText,
    align = "center",
    start,
    end,
    scrollYProgress,
}: {
    text: string;
    subText?: string;
    align?: "left" | "center" | "right";
    start: number;
    end: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const startPoint = Math.max(0, start - 0.08);
    const endPoint = Math.min(1, end + 0.08);

    const opacity = useTransform(
        scrollYProgress,
        [startPoint, start, end, endPoint],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [startPoint, endPoint],
        [40, -40]
    );

    const alignClass =
        align === "left"
            ? "items-start text-left"
            : align === "right"
                ? "items-end text-right"
                : "items-center text-center";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center px-8 md:px-20 ${alignClass}`}
        >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
                {text}
                <span className="text-accent-brick">.</span>
            </h2>
            {subText && (
                <p className="text-xl md:text-3xl text-slate-400 mt-6 font-light tracking-wide max-w-3xl leading-relaxed">
                    {subText}
                </p>
            )}
        </motion.div>
    );
};

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <>
            <Section
                text="Arpitsinh Thakor"
                subText="Full Stack Web & Android App Developer"
                align="center"
                start={0.05}
                end={0.25}
                scrollYProgress={scrollYProgress}
            />
            <Section
                text="Innovation at Scale"
                subText="Building high-performance digital ecosystems with precision and passion."
                align="left"
                start={0.35}
                end={0.55}
                scrollYProgress={scrollYProgress}
            />
            <Section
                text="Vision into Reality"
                subText="Transforming complex problems into elegant, user-centric experiences."
                align="right"
                start={0.65}
                end={0.85}
                scrollYProgress={scrollYProgress}
            />
        </>
    );
}
