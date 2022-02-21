import axios from "redaxios";
import useSWR from "swr/immutable";
import urlCat from "urlcat";

export interface Watching {
    cracked?: boolean;
    item: string;
    slug: string;
    started: string;
}

export default function useWatchingMutation() {
    const { data, mutate } = useSWR<Watching[]>("/account/watching");

    const removeWatching = (slug: string) => {
        const watching = data?.filter(game => game.slug !== slug);

        mutate(watching, false);
        mutate(
            axios
                .delete(
                    urlCat("/account/watching", {
                        slug,
                    })
                )
                .then(x => x.data),

            false
        );
    };

    const addWatching = (item: string, slug: string) => {
        const items = data?.concat({ slug, item, started: new Date().toUTCString() });

        mutate(items, false);
        mutate(
            axios
                .put(`/account/watching`, {
                    slug,
                    item,
                })
                .then(x => x.data),

            false
        );
    };

    return { removeWatching, addWatching, watching: data };
}
