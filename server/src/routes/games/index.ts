import { Static, Type } from "@sinclair/typebox";
import axios from "axios";
import { FastifyRequest as Req, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { RAWG_BASE } from "@config";

import { minifyImageSrc } from "@utils";

const querystring = Type.Object(
    {
        page: Type.Number({ default: 1, minimum: 1 }),
        period: Type.String({ default: "-6,0" }),
    },
    { additionalProperties: false }
);
type Querystring = Static<typeof querystring>;

const handler = async (req: Req<{ Querystring: Querystring }>) => {
    const setMonth = (date: Date, by: number) =>
        new Date(date.setMonth(new Date(date).getMonth() + by));

    const { page, period } = req.query;

    const [from, to] = period.split(",");

    const dates =
        setMonth(new Date(), Number(from)).toLocaleDateString("lt-LT") +
        "," +
        setMonth(new Date(), Number(to)).toLocaleDateString("lt-LT");

    const { data } = await axios.get<AxiosGames>(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 30,
            ordering: "-added",
            dates,
            page,
        })
    );

    // minify images
    const results = data.results.map(({ background_image, ...rest }) => ({
        background_image: minifyImageSrc(background_image),
        ...rest,
    }));

    return { ...data, results, next: !!data.next, previous: !!data.previous };
};

export default {
    method: "GET",
    url: "/games",
    handler,
    schema: { querystring },
} as RouteOptions;
