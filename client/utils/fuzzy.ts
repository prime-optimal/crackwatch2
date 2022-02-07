const flags = {
    skip: ["uncracked", "unlocked"],
};

export default async function Fuzzy(list: string[], query: string) {
    const Fuse = (await import("fuse.js")).default;
    // play around with settings to have a nice matching algo
    const fuse = new Fuse(list, { includeScore: true, threshold: 0.05 });

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
