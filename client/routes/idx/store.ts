import create from "zustand";

import immer from "@utils/immer";

interface Store {
    state: {
        filters: {
            applied: {
                months: number[];
            };
            state: {
                months: number[];
            };
        };
    };
    actions: {
        setMonths: (months: number[]) => void;
        applyMonths: () => void;
    };
}

export const useStore = create<Store>(
    immer(set => ({
        state: {
            filters: {
                applied: {
                    months: [-6, 0],
                },
                state: {
                    months: [-6, 0],
                },
            },
        },
        actions: {
            setMonths: months =>
                set(store => {
                    store.state.filters.state.months = months;
                }),
            applyMonths: () =>
                set(store => {
                    store.state.filters.applied.months = store.state.filters.state.months;
                }),
        },
    }))
);
