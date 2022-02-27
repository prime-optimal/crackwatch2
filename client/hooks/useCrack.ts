import axios from "redaxios";
import useSWR from "swr/immutable";

import { AxiosCrackSearch, Provider } from "@types";

import useProvidersMutation from "@hooks/mutations/useProvidersMutation";

// My recommended tier 1 default providers
export const defaultProviders: Provider[] = ["gamestatus", "steamcrackedgames"];

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
    const { providers = defaultProviders } = useProvidersMutation();

    const { data, error } = useSWR(query && providers ? { query, providers } : null, fetcher, {
        shouldRetryOnError: false,
    });

    return {
        providers: providers || defaultProviders,
        data,
        error: error?.data || error,
        cracked: data && data.result.length > 0,
        loading: !!(!data && !error && query),
    };
}
