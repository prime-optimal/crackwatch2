import axios from "redaxios";
import urlCat from "urlcat";

import tryToCatch from "@utils/catch";
import Fuzzy from "@utils/fuzzy";

const BASE_URL = "https://steamcrackedgames.com";
const PROXY_URL = "https://proxy.tronikel-apps.com";

export default async function SteamCrackedGames(query: string) {
    const url = urlCat(PROXY_URL, {
        url: urlCat(BASE_URL, "/search", {
            q: query,
        }),
    });

    const [result, error] = await tryToCatch(() => axios.get<string>(url));
    if (!result) {
        throw error;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(result.data, "text/html");

    const container = doc.querySelector("tbody#tbody_games");

    const titles: string[] = [];
    container?.querySelectorAll("tr").forEach(el => {
        const title = el.querySelector("a.text-white")?.textContent;
        const cracked = el
            .querySelector("span.cracked-text")
            ?.textContent?.includes("cracked");

        title && cracked && titles.push(title);
    });

    return Fuzzy(titles, query);
}
