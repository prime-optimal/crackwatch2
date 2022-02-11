import axios from "redaxios";
import urlCat from "urlcat";

import { Provider } from "@types";

import tryToCatch from "@utils/catch";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://pcgamestorrents.com";
const PROXY_URL = "https://proxy.tronikel-apps.com";

// Tier 2 provider
const provider: Provider = "pcgamestorrents";

const search = async (query: string) => {
    const url = urlCat(PROXY_URL, {
        url: urlCat(BASE_URL, {
            s: query,
        }),
    });

    const [result, error] = await tryToCatch(() => axios.get<string>(url));
    if (!result) {
        throw error;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(result.data, "text/html");

    const items = doc.querySelectorAll("article");

    const titles: string[] = [];
    items?.forEach(el => {
        const title = el.querySelector("h1");
        title?.textContent && titles.push(title.textContent);
    });

    return Fuzzy(titles, query, "PcGamesTorrents");
};

export default { provider, search };
