import { useEffect, useRef } from "react";

import onServer from "@utils/onServer";

export default function useInterval(fn: () => void, ms = 200) {
    const timeoutRef = useRef<number>();
    const fnRef = useRef(fn);

    // always call the latest given function
    useEffect(() => {
        fnRef.current = fn;
    });

    useEffect(() => {
        if (onServer()) return;

        const iteration = () => {
            timeoutRef.current = setTimeout(() => {
                fnRef.current();
                iteration();
            }, ms) as unknown as number;
        };
        iteration();

        return () => clearTimeout(timeoutRef.current);
    }, [ms]);
}
