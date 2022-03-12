import { OptionsObject, SnackbarKey, useSnackbar } from "notistack";

type useNotistackFn = (msg: string, opts?: OptionsObject) => SnackbarKey;

export default function useNotistack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const success: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "success" });

    const error: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "error" });

    const normal: useNotistackFn = (msg, opts) =>
        enqueueSnackbar(msg, { ...opts, variant: "default" });

    const close = (key: string) => closeSnackbar(key);

    return { success, error, normal, close };
}
