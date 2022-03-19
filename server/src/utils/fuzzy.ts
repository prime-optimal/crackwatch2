import fuzzy from "fuzzysort";

const flags = {
    skip: ["uncracked", "unlocked"],
};

// play around with these settings
const defaultOptions: Fuzzysort.Options = {
    allowTypo: false,
    limit: 1,
    threshold: -12,
};

const clearRegex = /[^\w\s]/g;

interface List {
    group: string | null;
    title: string;
}

export default async function Fuzzy(list: List[], query: string, options = defaultOptions) {
    const items = list
        .filter(({ title }) => !flags.skip.some(flag => title.includes(flag)))
        // remove weird letters
        .map(({ title, group }) => ({ title: title.replace(clearRegex, ""), group }));

    const result = await fuzzy.goAsync(query.replace(clearRegex, ""), items, {
        ...defaultOptions,
        ...options,
        key: "title",
    });

    return result.length > 0 ? result[0].obj : null;
}
