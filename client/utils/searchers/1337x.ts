import axios from "redaxios";
import urlCat from "urlcat";

import tryToCatch from "@utils/catch";

const BASE_URL = "https://1337x.to";
const PROXY_URL = "https://proxy.tronikel-apps.com";

export default async function OneThreeThreeSeven(query: string) {
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

    // fuzzy match the names
    const Fuse = (await import("fuse.js")).default;
    // play around with settings to have a nice matching algo
    const fuse = new Fuse(titles, { includeScore: true, threshold: 0.05 });
    const data = fuse.search(query);

    const found = data.length > 0;
    if (!found) throw "Not found";

    return {
        query,
        data,
    };
}
