import axios from "redaxios";

import { GameStatusSearch } from "@types";

import tryToCatch from "@utils/catch";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://gamestatus.info/back/api/gameinfo/game/search_title/";

const headers = {
    Referer: "https://gamestatus.info/",
};

// Tier 1 provider
const provider = "gamestatus";

const search = async (query: string) => {
    const [result, error] = await tryToCatch(() =>
        axios.post<GameStatusSearch[]>(BASE_URL, { title: query }, { headers })
    );
    if (!result) {
        throw error;
    }

    const titles = result.data
        .filter(({ crack_date }) => !!crack_date)
        .map(({ title }) => title);

    return Fuzzy(titles, query, provider, { threshold: 0.2 });
};

export default { provider, search };
