import axios from "redaxios";
import urlCat from "urlcat";

import { BASE_URL } from "@config";

export default function SSRAxios(url: string) {
    return axios.get(urlCat(BASE_URL, `/api${url}`), {
        headers: {
            "ssr-secret": process.env.SSR_SECRET || "",
        },
    });
}
