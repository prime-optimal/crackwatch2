import type Fuse from "fuse.js";

const flags = {
    skip: ["uncracked", "unlocked"],
};

// play around with settings to have a nice matching algo
const settings: Fuse.IFuseOptions<string> = {
    includeScore: true,
    threshold: 0.05,
    isCaseSensitive: true,
};

export default async function Fuzzy(list: string[], query: string) {
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(list, settings);

    // skip items with flags
    fuse.remove(item => flags.skip.some(flag => item.toLowerCase().includes(flag)));
    const data = fuse.search(query);

    const found = data.length > 0;
    if (!found) throw "Not found";

    return {
        query,
        data,
    };
}
