import cheerio from "cheerio";
import urlCat from "urlcat";

import { Provider } from "@types";

import { crackClient } from "@utils/axios";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://steamcrackedgames.com";

// Tier S provider
const provider: Provider = "steamcrackedgames";

const search = async (query: string) => {
    const url = urlCat(BASE_URL, "/search", {
        q: query,
    });

    const { data } = await crackClient.get(url);

    const $ = cheerio.load(data);

    const container = $("tbody#tbody_games");

    const titles: string[] = [];
    container.find("tr").each((i, el) => {
        const title = $(el).find("a.text-white").first().text().trim();

        const cracked = $(el).find("span.cracked-text").text().includes("cracked");

        title && cracked && titles.push(title);
    });

    return Fuzzy(titles, query);
};

export default { provider, search };
