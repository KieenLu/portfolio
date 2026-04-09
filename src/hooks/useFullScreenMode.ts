import { useEffect, useState } from "react";

export const useFullscreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const checkFullscreenState = (): boolean => {
        return !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).msFullscreenElement ||
            (document as any).mozFullScreenElement
        );
    };

    const enterFullScreen = async (): Promise<void> => {
        const element = document.documentElement as any;

        try {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            }
        } catch (error) {
            console.error("Failed to enter fullscreen:", error);
        }
    };

    const exitFullScreen = async (): Promise<void> => {
        const doc = document as any;

        try {
            if (doc.exitFullscreen) {
                await doc.exitFullscreen();
            } else if (doc.webkitExitFullscreen) {
                await doc.webkitExitFullscreen();
            } else if (doc.msExitFullscreen) {
                await doc.msExitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                await doc.mozCancelFullScreen();
            }
        } catch (error) {
            console.error("Failed to exit fullscreen:", error);
        }
    };

    const toggleFullScreen = () => {
        if (isFullScreen) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
    };

    useEffect(() => {
        const updateFullscreenState = () => {
            setIsFullScreen(checkFullscreenState());
        };

        updateFullscreenState();

        const events = [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "MSFullscreenChange",
        ];

        events.forEach((event) => {
            document.addEventListener(event, updateFullscreenState);
        });

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, updateFullscreenState);
            });
        };
    }, []);

    return { isFullScreen, toggleFullScreen };
};
