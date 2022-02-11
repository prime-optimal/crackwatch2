import { useEffect, useState } from "react";

import Providers from "@utils/searchers";

const defaultProviders = ["gamestatus", "steamcrackedgames", "pcgamestorrents"];

// pass a name and providers and this hook will return whether the game has been cracked
export function useCrack(name: string | null = null, providers = defaultProviders) {
    const [cracked, setCracked] = useState<boolean | null>(null);

    useEffect(() => {
        if (!name) return;

        const query = async (provider: string) => {
            const search = Providers.find(x => x.provider === provider)?.search;
            if (!search) {
                throw "Incorrect provider passed!";
            }

            if (await search(name)) {
                setCracked(true);
            }
        };

        const queries = providers.map(provider => query(provider));
        Promise.all(queries)
            .then(() => {
                setCracked(x => (x ? x : false));
            })
            .catch(error => alert(JSON.stringify(error)));
    }, [name, providers]);

    return { cracked };
}
