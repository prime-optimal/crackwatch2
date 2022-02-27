import fuzzy from "fuzzysort";

import type { fuzzysort } from "@types";

const flags = {
    skip: ["uncracked", "unlocked"],
};

// play around with these settings
const defaultOptions: fuzzysort.Options = {
    allowTypo: false,
    limit: 5,
    threshold: -12,
};

export default async function Fuzzy(list: string[], query: string, options = defaultOptions) {
    const items = list.filter(item => !flags.skip.some(flag => item.includes(flag)));

    const result = await fuzzy.goAsync(query, items, { ...defaultOptions, ...options });

    return result;
}
