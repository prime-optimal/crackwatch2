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

    return Fuzzy(items, query, { threshold: -20 });
};

export default { search, provider };
