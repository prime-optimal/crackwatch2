export default function parseError(error: any) {
    return String(error?.data.message || error?.data || error);
}
