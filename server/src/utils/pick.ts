export default function pick<T>(items: T, keys: string[]) {
    if (Array.isArray(items)) {
        const filtered = [];

        for (const item of items) {
            const filter = {} as any;

            for (const key of keys) {
                filter[key] = item[key];
            }
            filtered.push(filter);
        }

        return filtered as any as T;
    }

    const filtered = {};

    for (const key of keys) {
        (filtered as any)[key] = (items as any)[key];
    }

    return filtered as T;
}
