import { GameStatusSearch, Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

import { SearchResults } from ".";

const BASE_URL = "https://gamestatus.info/back/api/gameinfo/game/search_title/";

const headers = {
    Referer: "https://gamestatus.info/",
};

// Tier S provider
const provider: Provider = "gamestatus";

const search = async (query: string): Promise<SearchResults> => {
    const { data } = await crackClient.post(BASE_URL, { title: query }, { headers });

    const titles = (data as any as GameStatusSearch[])
        .filter(({ crack_date }) => !!crack_date)
        .map(({ title, hacked_groups }) => ({ title, group: JSON.parse(hacked_groups)[0] }));

    const result = await Fuzzy(titles, query, { threshold: -4 });

    return { result, provider };
};

export default { provider, search };
