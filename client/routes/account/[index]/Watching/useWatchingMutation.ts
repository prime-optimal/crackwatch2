import { dequal } from "dequal";
import { merge } from "merge-anything";
import axios from "redaxios";
import urlCat from "urlcat";

import useUser from "@hooks/useUser";

export default function useWatchingMutation() {
    const { data: user, mutate } = useUser({
        compare: (a, b) => dequal(a?.watching, b?.watching),
    });

    const deleteWatching = (slug: string) => {
        if (!user?.user.nickname) return;

        mutate(user => {
            if (!user?.user.nickname) return;

            return merge(user || {}, {
                watching: { items: user?.watching.items.filter(game => game.slug !== slug) },
            });
        }, false);

        mutate(async user => {
            if (!user?.user.nickname) return;

            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );
            return merge(user || {}, { watching });
        }, false);
    };

    const toggleNotifications = (notifications: boolean) => {
        if (!user?.user.nickname) return;

        mutate(user => merge(user || {}, { watching: { notifications: true } }), false);
        mutate(async user => {
            const { data: watching } = await axios.options(
                urlCat("/account/watching", {
                    notifications,
                })
            );

            return merge(user || {}, { watching });
        }, false);
    };

    return { deleteWatching, toggleNotifications, watching: user?.watching };
}
