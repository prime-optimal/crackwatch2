import { useEffect, useState } from "react";

import Providers from "@utils/searchers";

// idea: if more than 1 providers are chosen then return a state, eg 1/3 2/3 3/3 for cool loading
export function useCrack(
    name: string | null = null,
    settings = ["gamestatus", "steamcrackedgames", "pcgamestorrents"]
) {
    const [cracked, setCracked] = useState<boolean | null>(null);

    useEffect(() => {
        if (!name) return;

        const query = async (provider: string) => {
            const search = Providers.find(x => x.provider === provider)?.search;
            if (!search) return;

            if (await search(name)) {
                setCracked(true);
            }
        };

        const queries = settings.map(provider => query(provider));
        Promise.allSettled(queries).then(() => {
            setCracked(x => (x ? x : false));
        });
    }, [name, settings]);

    return { cracked };
}
