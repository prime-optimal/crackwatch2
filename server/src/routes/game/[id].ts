import axios from "axios";
import { FastifySchema, RouteHandlerMethod, RouteOptions } from "fastify";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

const schema: FastifySchema = {
    params: {
        type: "object",
        properties: {
            id: { type: "string" },
        },
    },
};

const handler: RouteHandlerMethod = async request => {
    const { id } = request.params as { [key: string]: string };

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games/:id", {
            key: process.env.RAWG_KEY,
            id,
        })
    );

    return data;
};

export default {
    url: "/game/:id",
    method: "GET",
    handler,
    schema,
} as RouteOptions;
