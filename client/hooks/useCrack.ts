import useSWR from "swr/immutable";

import tryToCatch from "@utils/catch";
import PcGamesTorrents from "@utils/searchers/pcgamestorrents";
import Skidrow from "@utils/searchers/skidrow";

const fetcher = async (name: string) => {
    const [result] = await tryToCatch(() =>
        Promise.any([Skidrow(name), PcGamesTorrents(name)])
    );
    return !!result;
};

export function useCrack(name: string | null = null) {
    const { data: cracked } = useSWR(name, fetcher, { shouldRetryOnError: false });

    return {
        status: {
            cracked,
        },
    };
}
