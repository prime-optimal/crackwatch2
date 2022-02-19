import Fuse from "fuse.js";

const flags = {
    skip: ["uncracked", "unlocked"],
};

// play around with settings to have a nice matching algo
const defaultOptions: Fuse.IFuseOptions<string> = {
    includeScore: true,
    threshold: 0.1,
    isCaseSensitive: false,
    distance: 15,
};

export default async function Fuzzy(list: string[], query: string, options = defaultOptions) {
    const fuse = new Fuse(list, { ...defaultOptions, ...options });

    // skip items with flags
    fuse.remove(item => flags.skip.some(flag => item.toLowerCase().includes(flag)));
    const data = fuse.search(query);

    return data;
}
