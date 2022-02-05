import axios from "axios";
import { FastifySchema, RouteHandlerMethod, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

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

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            search: q,
        })
    );

    return data;
};

export default {
    url: "/games/search",
    method: "GET",
    handler,
    schema,
} as RouteOptions;
