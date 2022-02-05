import axios from "axios";
import { FastifySchema, FastifyRequest as Request, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { AxiosGamesPopular } from "@types";

import { RAWG_BASE } from "@config";

const schema: FastifySchema = {
    querystring: {
        type: "object",
        properties: {
            page: {
                type: "number",
                default: 1,
            },
        },
    },
};

const handler = async (request: Request) => {
    const setMonth = (date: Date, by: number) =>
        new Date(date.setMonth(new Date(date).getMonth() + by));

    const dates =
        setMonth(new Date(), -6).toLocaleDateString("lt-LT") +
        "," +
        setMonth(new Date(), 0).toLocaleDateString("lt-LT");

    const { page } = request.query as { [key: string]: string };

    const { data } = await axios.get<AxiosGamesPopular>(
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
    const results = data.results.map(({ background_image, ...rest }) => {
        const split = background_image.split("/media/");
        const minified = `${split[0]}/media/crop/600/400/${split[1]}`;

        return {
            background_image: minified,
            ...rest,
        };
    });

    return { ...data, results, next: !!data.next, previous: !!data.previous };
};

export default {
    method: "GET",
    url: "/games/popular",
    handler,
    schema,
} as RouteOptions;
