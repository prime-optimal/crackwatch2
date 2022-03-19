import * as cheerio from "cheerio";
import urlCat from "urlcat";

import { Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

import { SearchResults } from ".";

const BASE_URL = "https://pcgamestorrents.com";

// Tier B provider
const provider: Provider = "pcgamestorrents";

const search = async (query: string): Promise<SearchResults> => {
    const url = urlCat(BASE_URL, {
        s: query,
    });

    const { data } = await crackClient.get(url);

    const $ = cheerio.load(data);

    const items = $("article");

    const titles: string[] = [];
    items.each((i, el) => {
        const title = $(el).find("h1").text().trim();
        title && titles.push(title);
    });

    const result = await Fuzzy(
        titles.map(title => ({ title, group: "Unknown" })),
        query
    );

    return { result, provider };
};

export default { provider, search };
