"use client";

import React, { useEffect, useRef } from "react";

const CreativeBackground = () => {
    const canvasRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawBackground = (animationTime) => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create base dark background
            const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            baseGradient.addColorStop(0, "#0d1828");
            baseGradient.addColorStop(0.5, "#000000");
            baseGradient.addColorStop(1, "#000000");

            ctx.fillStyle = baseGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add subtle shadow zones to support 3D shadows
            const shadowGradient = ctx.createRadialGradient(
                canvas.width * 0.5,
                canvas.height * 0.8,
                0,
                canvas.width * 0.5,
                canvas.height * 0.8,
                Math.max(canvas.width, canvas.height) * 0.6
            );
            shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
            shadowGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.05)");
            shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = shadowGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // First light point - top right corner
            const topRightX = canvas.width * 0.85 + Math.sin(animationTime * 0.0003) * 15;
            const topRightY = canvas.height * 0.15 + Math.cos(animationTime * 0.0002) * 10;
            const topRightRadius = Math.max(canvas.width, canvas.height) * 0.55;

            const topRightGradient = ctx.createRadialGradient(
                topRightX,
                topRightY,
                0,
                topRightX,
                topRightY,
                topRightRadius
            );
            topRightGradient.addColorStop(0, "rgba(64, 164, 223, 0.35)"); // Slightly increased opacity
            topRightGradient.addColorStop(0.3, "rgba(64, 164, 223, 0.18)");
            topRightGradient.addColorStop(0.6, "rgba(64, 164, 223, 0.08)");
            topRightGradient.addColorStop(1, "rgba(64, 164, 223, 0)");

            ctx.fillStyle = topRightGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Second light point - bottom left corner
            const bottomLeftX = canvas.width * 0.15 + Math.sin(animationTime * 0.0004) * 12;
            const bottomLeftY = canvas.height * 0.85 + Math.cos(animationTime * 0.0003) * 8;
            const bottomLeftRadius = Math.max(canvas.width, canvas.height) * 0.35;

            const bottomLeftGradient = ctx.createRadialGradient(
                bottomLeftX,
                bottomLeftY,
                0,
                bottomLeftX,
                bottomLeftY,
                bottomLeftRadius
            );
            bottomLeftGradient.addColorStop(0, "rgba(100, 200, 255, 0.28)");
            bottomLeftGradient.addColorStop(0.3, "rgba(100, 200, 255, 0.15)");
            bottomLeftGradient.addColorStop(0.6, "rgba(100, 200, 255, 0.06)");
            bottomLeftGradient.addColorStop(1, "rgba(100, 200, 255, 0)");

            ctx.fillStyle = bottomLeftGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add environmental reflection spots
            const reflectionSpots = [
                {
                    x: canvas.width * 0.3,
                    y: canvas.height * 0.4,
                    radius: 80,
                    intensity: 0.04 + Math.sin(animationTime * 0.0008) * 0.02,
                },
                {
                    x: canvas.width * 0.7,
                    y: canvas.height * 0.6,
                    radius: 60,
                    intensity: 0.03 + Math.cos(animationTime * 0.0006) * 0.015,
                },
            ];

            reflectionSpots.forEach((spot) => {
                const reflectionGradient = ctx.createRadialGradient(
                    spot.x,
                    spot.y,
                    0,
                    spot.x,
                    spot.y,
                    spot.radius
                );
                reflectionGradient.addColorStop(0, `rgba(120, 180, 255, ${spot.intensity})`);
                reflectionGradient.addColorStop(
                    0.5,
                    `rgba(120, 180, 255, ${spot.intensity * 0.5})`
                );
                reflectionGradient.addColorStop(1, "rgba(120, 180, 255, 0)");

                ctx.fillStyle = reflectionGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Enhanced animated streaks
            const streakAngle1 = (animationTime * 0.0002) % (Math.PI * 2);
            const streakAngle2 = (animationTime * 0.00015 + Math.PI) % (Math.PI * 2);

            // Streak from top right
            const streak1X = topRightX + Math.cos(streakAngle1) * 80;
            const streak1Y = topRightY + Math.sin(streakAngle1) * 80;

            const streak1Gradient = ctx.createRadialGradient(
                streak1X,
                streak1Y,
                0,
                streak1X,
                streak1Y,
                60
            );
            streak1Gradient.addColorStop(
                0,
                `rgba(64, 164, 223, ${0.08 + Math.sin(animationTime * 0.001) * 0.03})`
            );
            streak1Gradient.addColorStop(0.5, `rgba(64, 164, 223, 0.04)`);
            streak1Gradient.addColorStop(1, "rgba(64, 164, 223, 0)");

            ctx.fillStyle = streak1Gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Streak from bottom left
            const streak2X = bottomLeftX + Math.cos(streakAngle2) * 70;
            const streak2Y = bottomLeftY + Math.sin(streakAngle2) * 70;

            const streak2Gradient = ctx.createRadialGradient(
                streak2X,
                streak2Y,
                0,
                streak2X,
                streak2Y,
                50
            );
            streak2Gradient.addColorStop(
                0,
                `rgba(100, 200, 255, ${0.07 + Math.cos(animationTime * 0.0008) * 0.025})`
            );
            streak2Gradient.addColorStop(0.5, `rgba(100, 200, 255, 0.035)`);
            streak2Gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

            ctx.fillStyle = streak2Gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            time += 16; // Approximate 60fps
            drawBackground(time);
            animationIdRef.current = requestAnimationFrame(animate);
        };

        // Initial setup
        resizeCanvas();
        animate();

        // Handle resize
        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <div className="-z-20 w-full h-full absolute bg-black">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: "block" }}
            />
            {/* Enhanced overlay with better shadow support */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/8 via-transparent to-black/15 pointer-events-none" />

            {/* Additional subtle vignette for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none" />
        </div>
    );
};

export default CreativeBackground;
