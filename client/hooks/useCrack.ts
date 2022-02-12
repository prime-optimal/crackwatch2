import useSWR from "swr/immutable";

import { Provider } from "@types";

import tryToCatch from "@utils/catch";
import Providers from "@utils/searchers";

const defaultProviders: Provider[] = ["gamestatus", "steamcrackedgames"];

interface FetcherProps {
    name: string;
    providers: Provider[];
}

const fetcher = async ({ name, providers }: FetcherProps) => {
    if (!name) return;

    const query = (provider: string) => {
        const search = Providers.find(x => x.provider === provider)?.search;
        if (!search) {
            throw "Incorrect provider passed!";
        }

        return search(name);
    };

    const queries = providers.map(provider => query(provider));

    const [result] = await tryToCatch(() => Promise.all(queries));
    return result;
};

// pass a name and providers and this hook will return whether the game has been cracked
export function useCrack(name: string | null = null, providers = defaultProviders) {
    const { data = null } = useSWR(name && { name, providers }, fetcher);

    return {
        data,
        cracked: data && data.some(results => results.length > 0),
    };
}
