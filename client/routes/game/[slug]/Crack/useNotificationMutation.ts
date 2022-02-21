import { merge } from "merge-anything";
import axios from "redaxios";
import urlCat from "urlcat";

import useUser from "@hooks/useUser";

export default function useWatchingMutation() {
    const { data, mutate } = useUser();

    const addWatching = (item: string, slug: string) => {
        if (!data?.nickname) return;

        const items = [
            ...data.watching.items,
            { slug, item, started: new Date().toUTCString() },
        ];

        mutate(user => merge(user || {}, { watching: { items } }), false);
        mutate(async user => {
            const { data: watching } = await axios.put(`/account/watching`, {
                slug,
                item,
            });

            return merge(user || {}, { watching }) as any;
        }, false);
    };

    const removeWatching = (slug: string) => {
        if (!data?.nickname) return;

        const items = data.watching.items.filter(game => game.slug !== slug);

        mutate(user => merge(user || {}, { watching: { items } }), false);
        mutate(async user => {
            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );

            return merge(user || {}, { watching }) as any;
        }, false);
    };

    return { addWatching, removeWatching, watching: data?.watching };
}
