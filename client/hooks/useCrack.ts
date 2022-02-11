import useSWR from "swr/immutable";

import tryToCatch from "@utils/catch";
import GameStatus from "@utils/searchers/gamestatus";
import PcGamesTorrents from "@utils/searchers/pcgamestorrents";
import Skidrow from "@utils/searchers/skidrow";
import SteamCrackedGames from "@utils/searchers/steamcrackedgames";

const fetcher = async (name: string) => {
    const [result] = await tryToCatch(() =>
        Promise.any([
            Skidrow(name),
            PcGamesTorrents(name),
            SteamCrackedGames(name),
            GameStatus(name),
        ])
    );
    console.log({ result });

    return result;
};

// idea: if more than 1 providers are chosen then return a state, eg 1/3 2/3 3/3 for cool loading
export function useCrack(name: string | null = null) {
    const { data: result } = useSWR(name, fetcher, { shouldRetryOnError: false });

    return {
        status: {
            result,
        },
    };
}
