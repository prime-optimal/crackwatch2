import axios from "redaxios";
import urlCat from "urlcat";

import { Provider } from "@types";

import tryToCatch from "@utils/catch";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://1337x.to";
const PROXY_URL = "https://proxy.tronikel-apps.com";

// Tier 3 provider
const provider: Provider = "1337x";

const search = async (query: string) => {
    const url = urlCat(PROXY_URL, {
        url: urlCat(BASE_URL, "/category-search/:query/Games/1/", {
            query,
        }),
    });

    const [result, error] = await tryToCatch(() => axios.get<string>(url));
    if (!result) {
        throw error;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(result.data, "text/html");

    const container = doc.querySelector(".table-list > tbody:nth-child(2)");

    const titles: string[] = [];
    container?.querySelectorAll("tr").forEach(el => {
        const title = el.querySelector("td.name")?.textContent;
        title && titles.push(title);
    });

    return Fuzzy(titles, query);
};

export default { provider, search };
