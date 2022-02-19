import axios from "redaxios";
import useSWR from "swr/immutable";

import { AxiosCrackSearch, Provider } from "@types";

import useUser from "@hooks/useUser";

// My recommended tier 1 default providers
const defaultProviders: Provider[] = ["gamestatus", "steamcrackedgames"];

interface FetcherProps {
    query: string;
    providers?: Provider[];
}

const fetcher = async ({ query, providers = defaultProviders }: FetcherProps) => {
    const { data } = await axios.post<AxiosCrackSearch>("/crack/search", {
        query,
        providers,
    });
    return data;
};

// pass a query and providers and this hook will return whether the game has been cracked
export default function useCrack(query: string | null) {
    const { data: user } = useUser();

    const { data = null, error } = useSWR(
        query && user ? { query, providers: user.providers } : null,
        fetcher,
        { shouldRetryOnError: false }
    );

    return {
        providers: user?.providers || defaultProviders,
        data,
        error: error?.data || error,
        cracked: !error,
        loading: data === null && !error,
    };
}
