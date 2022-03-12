import {
    OptionsObject,
    SnackbarKey,
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
} from "notistack";
import { createContext, useContext } from "react";

type useNotistackFn = (msg: string, opts?: OptionsObject) => SnackbarKey;

interface useNotistackContext {
    success: useNotistackFn;
    error: useNotistackFn;
    normal: useNotistackFn;
    close: (key: string) => void;
}

const Context = createContext<useNotistackContext>({} as any);

const ContextProvider = ({ children }: any) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const success: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "success" });

    const error: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "error" });

    const normal: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "default" });

    const close = (key: string) => closeSnackbar(key);

    return (
        <Context.Provider value={{ success, error, normal, close }}>
            {children}
        </Context.Provider>
    );
};

// make useSnackbar available to ContextProvider
export const SnackProvider = ({ children, ...props }: SnackbarProviderProps) => {
    return (
        <SnackbarProvider {...props}>
            <ContextProvider>{children}</ContextProvider>
        </SnackbarProvider>
    );
};

export const useNotistack = () => useContext(Context);
