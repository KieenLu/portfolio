export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(value, max));

export const setBodyOverflow = (locked: boolean) => {
    const value = locked ? "hidden" : "";
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
};

export const WINDOW_CONFIG = {
    lerpFactor: 0.1,
    shadow: {
        dragging: "0 40px 100px rgba(0,0,0,0.7)",
        resting: "0 20px 60px rgba(0,0,0,0.5)",
    },
} as const;
