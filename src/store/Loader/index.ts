import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LoaderState {
    hasAppBeenLoaded: boolean;
    setAppLoaded: () => void;
}
export const useLoaderStore = create<LoaderState>()(
    immer((set) => ({
        hasAppBeenLoaded: false,

        setAppLoaded: () =>
            set((state) => {
                state.hasAppBeenLoaded = true;
            }),
    }))
);
