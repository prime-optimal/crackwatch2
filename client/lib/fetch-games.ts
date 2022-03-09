import axios from "redaxios";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

const pick = require("server/dist/utils/pick").default;
const minifyImageSrc = require("server/dist/utils/minify").minifyImageSrc;

export default async function FetchGames() {
    const dates =
        new Date(new Date().setMonth(new Date().getMonth() - 4)).toLocaleDateString("lt-LT") +
        "," +
        new Date().toLocaleDateString("lt-LT");

    const result = await axios.get<AxiosGames>(
        urlCat("https://api.rawg.io/api", "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 8,
            ordering: "-added",
            dates,
            page: 1,
        })
    );

    result.data.results = pick(result.data.results, [
        "id",
        "name",
        "background_image",
        "clip",
        "genres",
        "slug",
        "released",
    ]);

    // minify images
    const results = result.data.results.map(({ background_image, ...rest }) => ({
        background_image: minifyImageSrc(background_image),
        ...rest,
    }));

    return { ...result.data, results, next: true, previous: false };
}
