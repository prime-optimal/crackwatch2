import * as cheerio from "cheerio";
import urlCat from "urlcat";

import { Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://1337x.to";

// Tier C provider
const provider: Provider = "1337x";

const search = async (query: string) => {
    const url = urlCat(BASE_URL, "/category-search/:query/Games/1/", {
        query,
    });

    const { data } = await crackClient.get(url);

    const $ = cheerio.load(data);

    const container = $(".table-list > tbody:nth-child(2)");

    const titles: string[] = [];
    container.find("tr").each((i, el) => {
        const title = $(el).find("td.name").text().trim();
        title && titles.push(title);
    });

    return Fuzzy(titles, query);
};

export default { provider, search };
