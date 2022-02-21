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
        mutate(async () => {
            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );
            return watching;
        }, false);
    };

    const addWatching = (item: string, slug: string) => {
        const items = data?.concat({ slug, item, started: new Date().toUTCString() });

        mutate(items, false);
        mutate(async () => {
            const { data } = await axios.put(`/account/watching`, {
                slug,
                item,
            });
            return data;
        }, false);
    };

    return { removeWatching, addWatching, watching: data };
}
