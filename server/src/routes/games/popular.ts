import axios from "axios";
import { RouteOptions } from "fastify";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

const handler = async () => {
    const setMonth = (date: Date, by: number) =>
        new Date(date.setMonth(new Date(date).getMonth() + by));

    const dates = `${setMonth(new Date(), -2).toLocaleDateString("lt-LT")},${setMonth(
        new Date(),
        2
    ).toLocaleDateString("lt-LT")}`;

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 25,
            ordering: "-rating",
            metacritic: "40,100",
            dates,
        })
    );

    return data;
};

export default {
    method: "GET",
    url: "/games/popular",
    handler,
} as RouteOptions;
