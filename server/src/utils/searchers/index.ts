import tryToCatch from "@utils/catch";

import OneThreeThreeSeven from "./1337x";
import GameStatus from "./gamestatus";
import PcGamesTorrents from "./pcgamestorrents";
import Predb from "./predb";
import Skidrow from "./skidrow";
import SteamCrackedGames from "./steamcrackedgames";

const Providers = [
    OneThreeThreeSeven,
    GameStatus,
    PcGamesTorrents,
    Skidrow,
    SteamCrackedGames,
    Predb,
];

export interface SearchResults {
    provider: string;
    result: {
        title: string;
        group: string | null;
    } | null;
}

export default async function SearchCrack(query: string, providers: string[]) {
    // filter out the needed providers
    const filtered = Providers.filter(({ provider }) => providers.includes(provider));

    if (filtered.length < 1) {
        throw {
            statusCode: 400,
            message: "Unknown providers ¯\\_(ツ)_/¯",
        };
    }

    // this only looks complex
    const promises = filtered.map(
        ({ search, provider }) =>
            new Promise((resolve, reject) => {
                search(query)
                    .then(({ provider, result }) => {
                        if (!result) reject(`${provider} does not have cracks`);
                        else resolve({ provider, result });
                    })
                    .catch(() => reject(`${provider} did not respond`));
            })
    );

    const [result, error] = await tryToCatch(() => Promise.any(promises));

    if (!result) {
        return {
            provider: (error as AggregateError).errors.join(" - "),
            result: null,
        };
    }

    return result as SearchResults;
}
