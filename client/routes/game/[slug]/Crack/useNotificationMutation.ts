import { merge } from "merge-anything";
import axios from "redaxios";
import urlCat from "urlcat";

import useUser from "@hooks/useUser";

export default function useWatchingMutation() {
    const { data: user, mutate } = useUser();

    const addWatching = (item: string, slug: string) => {
        if (!user?.user.nickname) return;

        const items = [
            ...user.watching.items,
            { slug, item, started: new Date().toUTCString() },
        ];

        mutate(user => merge(user || {}, { watching: { items } }), false);
        mutate(async user => {
            const { data: watching } = await axios.put(`/account/watching`, {
                slug,
                item,
            });

            return merge(user || {}, { watching });
        }, false);
    };

    const removeWatching = (slug: string) => {
        if (!user?.user.nickname) return;

        const items = user.watching.items.filter(game => game.slug !== slug);

        mutate(user => merge(user || {}, { watching: { items } }), false);
        mutate(async user => {
            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );

            return merge(user || {}, { watching });
        }, false);
    };

    return { addWatching, removeWatching, watching: user?.watching };
}
