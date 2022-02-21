import { merge } from "merge-anything";
import axios from "redaxios";
import urlCat from "urlcat";

import useUser from "@hooks/useUser";

export default function useWatchingMutation() {
    const { data: user, mutate } = useUser();

    const deleteWatching = (slug: string) => {
        mutate(user => {
            if (!user?.nickname) return;

            return merge(user || {}, {
                watching: { items: user?.watching.items.filter(game => game.slug !== slug) },
            });
        }, false);

        mutate(async user => {
            if (!user?.nickname) return;

            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );
            return merge(user || {}, { watching }) as any;
        }, false);
    };

    return { deleteWatching, watching: user?.watching };
}
