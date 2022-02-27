import { GameStatusSearch, Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://gamestatus.info/back/api/gameinfo/game/search_title/";

const headers = {
    Referer: "https://gamestatus.info/",
};

// Tier S provider
const provider: Provider = "gamestatus";

const search = async (query: string) => {
    const { data } = await crackClient.post(BASE_URL, { title: query }, { headers });

    const titles = (data as any as GameStatusSearch[])
        .filter(({ crack_date }) => !!crack_date)
        .map(({ title }) => title);

    return Fuzzy(titles, query, { threshold: -4 });
};

export default { provider, search };
