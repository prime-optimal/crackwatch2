import * as cheerio from "cheerio";
import urlCat from "urlcat";

import { Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

import { SearchResults } from ".";

const BASE_URL = "https://www.skidrowreloaded.com";

// Tier B provider
const provider: Provider = "skidrow";

const search = async (query: string): Promise<SearchResults> => {
    const url = urlCat(BASE_URL, {
        s: query,
    });

    const { data } = await crackClient.get(url);

    const $ = cheerio.load(data);

    const items = $("#main-content").find("div.post");

    const titles: string[] = [];
    items.each((i, el) => {
        if (i === 0) return;

        const title = $(el).find("h2").text().trim();

        if (title.toLowerCase().includes("unlocked")) return;
        title && titles.push(title);
    });

    const result = await Fuzzy(
        titles.map(title => ({ title, group: "Unknown" })),
        query
    );

    return { result, provider };
};

export default { provider, search };
