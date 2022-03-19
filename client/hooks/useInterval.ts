import { useEffect, useRef } from "react";

import onServer from "@utils/onServer";

export default function useInterval(fn: () => void, ms = 200) {
    const intervalRef = useRef<number>();
    const fnRef = useRef(fn);

    // always call the latest given function
    useEffect(() => {
        fnRef.current = fn;
    });

    useEffect(() => {
        if (onServer()) return;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            fnRef.current();
        }, ms) as any as number;

        return () => clearInterval(intervalRef.current);
    }, [ms]);

    const reset = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            fnRef.current();
        }, ms) as any as number;
    };

    return { reset };
}
