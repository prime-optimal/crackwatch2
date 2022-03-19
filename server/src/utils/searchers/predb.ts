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

    const items = data.data.rows.map(({ name, team, cat }) => ({
        title: name.replace(`-${team}`, "").replace(/(\.|_)/g, " "),
        group: team,
        cat,
    }));

    // filter out known bad keywords
    const filtered = items
        .filter(({ title, cat }) => {
            const nsw = title.toLowerCase().includes("nsw");
            const console = cat.toLowerCase().match(/ps|xbox/g);
            return !nsw && !console;
        })
        .map(({ group, title }) => ({ group, title }));

    const result = await Fuzzy(filtered, query);

    return { result, provider };
};

export default { search, provider };
