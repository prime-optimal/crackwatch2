import axios from "axios";

import { GameStatusSearch, Provider } from "@types";

import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://gamestatus.info/back/api/gameinfo/game/search_title/";

const headers = {
    Referer: "https://gamestatus.info/",
};

// Tier S provider
const provider: Provider = "gamestatus";

const search = async (query: string) => {
    const result = await axios.post<GameStatusSearch[]>(
        BASE_URL,
        { title: query },
        { headers }
    );

    const titles = result.data
        .filter(({ crack_date }) => !!crack_date)
        .map(({ title }) => title);

    return Fuzzy(titles, query);
};

export default { provider, search };
