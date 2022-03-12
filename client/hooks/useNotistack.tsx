import {
    OptionsObject,
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
} from "notistack";
import { createContext, useContext } from "react";

type useNotistackFn = (msg: string, opts?: OptionsObject) => void;

interface useNotistackContext {
    success: useNotistackFn;
    error: useNotistackFn;
}

const Context = createContext<useNotistackContext>({} as any);

export function SnackProvider({ children, ...props }: SnackbarProviderProps) {
    const { enqueueSnackbar } = useSnackbar();

    const success = (msg: string, opts?: OptionsObject) => {
        enqueueSnackbar(msg, { ...opts, variant: "success" });
    };

    const error = (msg: string, opts?: OptionsObject) => {
        enqueueSnackbar(msg, { ...opts, variant: "error" });
    };

    return (
        <Context.Provider value={{ success, error }}>
            <SnackbarProvider {...props}>{children}</SnackbarProvider>
        </Context.Provider>
    );
}

export const useNotistack = () => useContext(Context);
