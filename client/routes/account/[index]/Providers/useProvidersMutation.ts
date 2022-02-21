import { merge } from "merge-anything";
import axios from "redaxios";

import useUser from "@hooks/useUser";

export default function useProvidersMutation() {
    const { data: user, mutate } = useUser();

    const addProvider = (provider: string) => {
        if (!user?.nickname) return;

        const providers = [...user.providers, provider];
        mutate(user => merge(user || {}, { providers }) as any, false);

        mutate(async user => {
            const { data } = await axios.put("/account/providers", {
                providers,
            });

            return merge(user || {}, { providers: data }) as any;
        }, false);
    };

    const removeProvider = (provider: string) => {
        if (!user?.nickname) return;

        const providers = user.providers.filter(x => x !== provider);
        mutate(user => merge(user || {}, { providers }), false);

        mutate(async user => {
            const { data } = await axios.put("/account/providers", {
                providers,
            });

            return merge(user || {}, { providers: data }) as any;
        }, false);
    };

    return { addProvider, removeProvider, providers: user?.providers };
}
