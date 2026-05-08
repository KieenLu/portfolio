import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

export type DeviceType = "mobile" | "tablet" | "desktop";

export const useDevice = () => {
    const { width, height } = useWindowSize();

    const device = useMemo((): DeviceType => {
        if (width < 768) return "mobile";
        if (width < 1024) return "tablet";
        return "desktop";
    }, [width]);

    return { device, width, height };
};
