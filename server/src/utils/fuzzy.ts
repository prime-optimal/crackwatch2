import fuzzy from "fuzzysort";

const flags = {
    skip: ["uncracked", "unlocked"],
};

// play around with these settings
const defaultOptions: Fuzzysort.Options = {
    allowTypo: true,
    limit: 5,
    threshold: -12,
};

const clearRegex = /[^\w\s]/g;

export default async function Fuzzy(list: string[], query: string, options = defaultOptions) {
    const items = list
        .filter(item => !flags.skip.some(flag => item.includes(flag)))
        // remove weird letters
        .map(item => item.replace(clearRegex, ""));

    const result = await fuzzy.goAsync(query.replace(clearRegex, ""), items, {
        ...defaultOptions,
        ...options,
    });

    return result;
}
