import axios from "redaxios";
import urlCat from "urlcat";

import tryToCatch from "@utils/catch";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://www.skidrowreloaded.com";
const PROXY_URL = "https://proxy.tronikel-apps.com";

// Tier 2 provider
export default async function Skidrow(query: string) {
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

    const items = doc.querySelector("#main-content")?.querySelectorAll("div.post");
    if (!items) return null;

    const titles: string[] = [];
    items.forEach((el, key) => {
        if (key === 0) return;

        const title = el.querySelector("h2")?.textContent;
        if (title?.toLocaleLowerCase().includes("unlocked")) return;
        title && titles.push(title);
    });

    return Fuzzy(titles, query);
}
