import urlCat from "urlcat";

import { AxiosPredb, Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://predb.ovh/api/v1";

// Tier S provider
const provider: Provider = "predb";

const search = async (query: string) => {
    const { data } = await crackClient.get<AxiosPredb>(
        urlCat(BASE_URL, {
            q: query + "@cat GAMES",
        })
    );

    const items = data.data.rows.map(({ name, team }) =>
        name.replace(`-${team}`, "").replace(/(\.|_)/g, " ")
    );

    // items with NSW in them don't seem to be cracked hmm
    const filtered = items.filter(item => !item.toLowerCase().includes("nsw"));

    return Fuzzy(filtered, query, { threshold: -18 });
};

export default { search, provider };
