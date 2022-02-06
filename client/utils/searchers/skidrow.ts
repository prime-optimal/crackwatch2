import axios from "redaxios";
import urlCat from "urlcat";

import tryToCatch from "@utils/catch";

const BASE_URL = "https://www.skidrowreloaded.com";
const PROXY_URL = "https://proxy.tronikel-apps.com";

export default async function Skidrow(query: string) {
    const url = urlCat(PROXY_URL, {
        url: urlCat(BASE_URL, {
            s: query,
        }),
    });

    const [result, error] = await tryToCatch(() => axios.get<string>(url));
    if (!result) {
        console.error(error);
        return null;
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

    // fuzzy match the names
    const Fuse = (await import("fuse.js")).default;
    // play around with settings to have a nice matching algo
    const fuse = new Fuse(titles, { includeScore: true, threshold: 0.05 });
    const data = fuse.search(query);

    return {
        found: data.length > 0,
        query,
        data,
    };
}
