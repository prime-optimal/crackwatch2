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
            released: string;
        };
    };
    actions: {
        setAnticipatedGames: () => void;
    };
}

const createStore = pipe(
    // persist in local-storage
    // (...args) => (persist as any)(...args, { name: "store" }),
    immer,
    create
) as typeof create;

export const useStore = createStore<IndexStore>(set => ({
    state: {
        filters: {
            released: "-6,0",
        },
    },
    actions: {
        setAnticipatedGames: () =>
            set(store => {
                store.state.filters = {
                    released: "0,24",
                };
            }),
    },
}));
