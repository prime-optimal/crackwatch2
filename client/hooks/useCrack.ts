import useSWR from "swr/immutable";

import tryToCatch from "@utils/catch";
import PcGamesTorrents from "@utils/searchers/pcgamestorrents";
import Skidrow from "@utils/searchers/skidrow";
import SteamCrackedGames from "@utils/searchers/steamcrackedgames";

const fetcher = async (name: string) => {
    // if it is an uncommon name then query trusted sources
    if (name.length < 7) {
        const [result] = await tryToCatch(() => Promise.any([SteamCrackedGames(name)]));
        return result;
    }

    const [result] = await tryToCatch(() =>
        Promise.any([Skidrow(name), PcGamesTorrents(name)])
    );
    return result;
};

export function useCrack(name: string | null = null) {
    const { data: result } = useSWR(name, fetcher, { shouldRetryOnError: false });

    return {
        status: {
            result,
        },
    };
}
