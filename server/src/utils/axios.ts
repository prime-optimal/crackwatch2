import axios from "axios";
import cachios from "cachios";

const headers = {
    Host: "rawg.io",
    Referer: "https://rawg.io",
    "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",
    "X-API-Client": "website",
    "X-API-Language": "en",
    "X-API-Referer": "%2F",
};

const rawgClient = cachios.create(
    axios.create({ baseURL: "https://api.rawg.io/api", headers }) as any,
    {
        stdTTL: 60 * 60 * 24,
        checkperiod: 600,
    }
);

const crackClient = cachios.create(
    axios.create({
        timeout: 1000 * 6,
        headers: {
            "user-agent": headers["user-agent"],
        },
    }) as any,
    { stdTTL: 60 * 60 * 2, checkperiod: 600 }
);

export { rawgClient, crackClient };
