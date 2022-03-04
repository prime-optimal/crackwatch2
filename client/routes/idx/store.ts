import produce, { Draft } from "immer";
import { pipe } from "pipe-ts";
import create, { GetState, SetState, State, StateCreator, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

const immer =
    <
        T extends State,
        CustomSetState extends SetState<T>,
        CustomGetState extends GetState<T>,
        CustomStoreApi extends StoreApi<T>
    >(
        config: StateCreator<
            T,
            (partial: ((draft: Draft<T>) => void) | T, replace?: boolean) => void,
            CustomGetState,
            CustomStoreApi
        >
    ): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
    (set, get, api) =>
        config(
            (partial, replace) => {
                const nextState =
                    typeof partial === "function"
                        ? produce(partial as (state: Draft<T>) => T)
                        : (partial as T);
                return set(nextState, replace);
            },
            get,
            api
        );

interface IndexStore {
    state: {
        filters: {
            query: {
                dates: string;
                ordering: string;
            };
            active: string;
        };
    };
    actions: {
        setAnticipatedGames: () => void;
        setPopularGames: () => void;
    };
}

const createStore = pipe(
    // persist in local-storage
    // (...args) => (persist as any)(...args, { name: "store" }),
    immer,
    create
) as typeof create;

const filterMap = {
    popular: {
        dates: "-4,0",
        ordering: "-added",
    },
    anticipated: {
        dates: "0,24",
        ordering: "-added",
    },
};

export const useStore = createStore<IndexStore>(set => ({
    state: {
        filters: {
            query: filterMap.popular,
            active: "Popular",
        },
    },
    actions: {
        setAnticipatedGames: () =>
            set(store => {
                store.state.filters.query = filterMap.anticipated;
                store.state.filters.active = "Anticipated";
            }),
        setPopularGames: () =>
            set(store => {
                store.state.filters.query = filterMap.popular;
                store.state.filters.active = "Popular";
            }),
    },
}));
