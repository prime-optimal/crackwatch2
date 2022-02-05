import axios from "axios";
import { RouteOptions } from "fastify";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

const handler = async () => {
    const setMonth = (date: Date, by: number) =>
        new Date(date.setMonth(new Date(date).getMonth() + by));

    const dates =
        setMonth(new Date(), -6).toLocaleDateString("lt-LT") +
        "," +
        setMonth(new Date(), 0).toLocaleDateString("lt-LT");

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 30,
            ordering: "-added",
            dates,
        })
    );

    return { ...data, next: !!data.next, previous: !!data.previous };
};

export default {
    method: "GET",
    url: "/games/popular",
    handler,
} as RouteOptions;
