import { useMemo } from "react";

export default function useIsReleased(date?: string | Date) {
    const isReleased = useMemo(() => {
        // one day margin
        const current = new Date().getTime() + 1000 * 60 * 60 * 24;
        const release = new Date(date || new Date()).getTime();

        return current >= release;
    }, [date]);

    return isReleased;
}
