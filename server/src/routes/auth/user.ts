import { FastifyRequest as Req, RouteOptions } from "fastify";

const handler = async (req: Req) => {
    return req.session.user || {};
};

export default {
    method: "GET",
    url: "/auth/user",
    handler,
} as RouteOptions;
