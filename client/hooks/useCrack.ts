import useSWR from "swr/immutable";

import { Provider } from "@types";

import tryToCatch from "@utils/catch";
import { Providers } from "@utils/searchers";

import useUser from "./useUser";

// My recommended tier 1 default providers
const defaultProviders: Provider[] = ["gamestatus", "steamcrackedgames"];

interface FetcherProps {
    providers?: Provider[];
    name: string;
}

const fetcher = async ({ name, providers = defaultProviders }: FetcherProps) => {
    if (!name) return;

    const query = async (provider: string) => {
        const search = Providers.find(x => x.provider === provider)?.search;
        if (!search) {
            throw "Incorrect provider passed!";
        }

        return { items: await search(name), provider };
    };

    const queries = providers.map(provider => query(provider));

    const [result] = await tryToCatch(() => Promise.all(queries));
    return result;
};

// pass a name and providers and this hook will return whether the game has been cracked
export default function useCrack(name: string | null) {
    const { data: user } = useUser();
    const { data = null } = useSWR(
        user && name ? { name, providers: user.providers } : null,
        fetcher
    );

    return {
        data,
        cracked: data && data.some(crack => crack.items.length > 0),
        loading: data === null,
    };
}
