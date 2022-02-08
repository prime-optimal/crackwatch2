import axios from "axios";
import { FastifySchema, RouteHandlerMethod, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

const schema: FastifySchema = {
    params: {
        type: "object",
        properties: {
            slug: { type: "string" },
        },
        required: ["slug"],
    },
};

const handler: RouteHandlerMethod = async req => {
    const { slug } = req.params as { [key: string]: string };

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games/:slug", {
            key: process.env.RAWG_KEY,
            slug,
        })
    );

    return data;
};

export default {
    url: "/game/:slug",
    method: "GET",
    handler,
    schema,
} as RouteOptions;
