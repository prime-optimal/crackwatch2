import axios from "redaxios";
import useSWR from "swr/immutable";

export type Provider =
    | "1337x"
    | "gamestatus"
    | "pcgamestorrents"
    | "skidrow"
    | "steamcrackedgames";

export default function useProvidersMutation() {
    const { data, mutate } = useSWR<Provider[]>("/account/providers");

    const sendProviders = (providers?: Provider[]) => {
        mutate(providers, false);
        mutate(async () => {
            const { data } = await axios.put("/account/providers", {
                providers,
            });
            return data;
        }, false);
    };

    const addProvider = (provider: Provider) => {
        const providers = data?.concat(provider);
        sendProviders(providers);
    };

    const removeProvider = (provider: Provider) => {
        const providers = data?.filter(x => x !== provider);
        sendProviders(providers);
    };

    return { addProvider, removeProvider, providers: data };
}
