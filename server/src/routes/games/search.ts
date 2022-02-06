import axios from "axios";
import { FastifySchema, RouteHandlerMethod, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { RAWG_BASE } from "@config";

import { minifyImageSrc } from "@utils";

const schema: FastifySchema = {
    querystring: {
        type: "object",
        properties: {
            q: { type: "string" },
        },
        required: ["q"],
    },
};

const handler: RouteHandlerMethod = async request => {
    const { q } = request.query as { [key: string]: string };

    const { data } = await axios.get<AxiosGames>(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            search: q,
            page_size: 10,
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
    url: "/games/search",
    method: "GET",
    handler,
    schema,
} as RouteOptions;
