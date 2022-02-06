export default async function tryToCatch<T>(
    fn: () => Promise<T>
): Promise<[T | null, Error | null]> {
    let result = null;
    try {
        result = await fn();
    } catch (error: any) {
        return [result, error];
    }
    return [result, null];
}
