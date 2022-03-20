import { IAxiosCacheAdapterOptions, setup } from "axios-cache-adapter";

const headers = {
    Host: "rawg.io",
    Referer: "https://rawg.io",
    "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",
    "X-API-Client": "website",
    "X-API-Language": "en",
    "X-API-Referer": "%2F",
};

const cache: IAxiosCacheAdapterOptions = {
    exclude: {
        methods: [],
        query: false,
    },
    readOnError: (error: any) => {
        return error.response.status >= 400 && error.response.status < 600;
    },
    clearOnStale: false,
    maxAge: 1000 * 60 * 60 * 24 * 2,
};

const rawgClient = setup({
    baseURL: "https://api.rawg.io/api",
    headers,
    cache,
});

const crackClient = setup({
    timeout: 1000 * 6,
    headers: {
        "user-agent": headers["user-agent"],
    },
    cache: {
        ...cache,
        maxAge: 1000 * 60 * 60 * 2,
    },
});

export { rawgClient, crackClient };
