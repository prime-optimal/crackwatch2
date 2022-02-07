import useSWR from "swr/immutable";

import tryToCatch from "@utils/catch";
import OneThreeThreeSeven from "@utils/searchers/1337x";
import PcGamesTorrents from "@utils/searchers/pcgamestorrents";
import Skidrow from "@utils/searchers/skidrow";

const fetcher = async (name: string) => {
    const [result] = await tryToCatch(() =>
        Promise.any([Skidrow(name), PcGamesTorrents(name), OneThreeThreeSeven(name)])
    );
    return result ? "y" : "n";
};

export function useCrack(name: string | null = null) {
    const { data: status } = useSWR(name, fetcher);

    return {
        status,
    };
}
