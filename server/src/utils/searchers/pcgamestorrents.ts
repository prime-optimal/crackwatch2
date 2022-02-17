import axios from "axios";
import cheerio from "cheerio";
import urlCat from "urlcat";

import { Provider } from "@types";

import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://pcgamestorrents.com";

// Tier B provider
const provider: Provider = "pcgamestorrents";

const search = async (query: string) => {
    const url = urlCat(BASE_URL, {
        s: query,
    });

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const items = $("article");

    const titles: string[] = [];
    items.each((i, el) => {
        const title = $(el).find("h1").text().trim();
        title && titles.push(title);
    });

    return Fuzzy(titles, query);
};

export default { provider, search };
