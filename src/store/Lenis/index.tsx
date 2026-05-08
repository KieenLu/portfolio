import Lenis from "lenis";
import { create } from "zustand";

interface LenisState {
    lenis: Lenis | null;
    // eslint-disable-next-line no-unused-vars
    setLenis: (lenis: Lenis | null) => void;
}

export const useLenisStore = create<LenisState>((set) => ({
    lenis: null,
    setLenis: (lenis) => set({ lenis }),
}));
