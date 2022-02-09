import { FastifyRequest as Req, RouteOptions } from "fastify";

import { authenticate } from "@hooks/authenticate";

const handler = async (req: Req) => {
    return req.session.user || {};
};

export default {
    method: "GET",
    url: "/auth/user",
    handler,
    onRequest: authenticate,
} as RouteOptions;
