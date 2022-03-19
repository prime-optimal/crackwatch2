import urlCat from "urlcat";

import { AxiosPredb, Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

import { SearchResults } from ".";

const BASE_URL = "https://predb.ovh/api/v1";

// Tier S provider
const provider: Provider = "predb";

const search = async (query: string): Promise<SearchResults> => {
    const { data } = await crackClient.get<AxiosPredb>(
        urlCat(BASE_URL, {
            q: query + "@cat GAMES",
        })
    );

    const items = data.data.rows.map(({ name, team }) => ({
        title: name.replace(`-${team}`, "").replace(/(\.|_)/g, " "),
        group: team,
    }));

    // items with NSW in them don't seem to be cracked hmm
    const filtered = items.filter(({ title }) => !title.toLowerCase().includes("nsw"));

    const result = await Fuzzy(filtered, query);

    return { result, provider };
};

export default { search, provider };
