import { FastifyReply, FastifyRequest as Req, RouteOptions } from "fastify";

const handler = (req: Req, res: FastifyReply) => {
    req.destroySession(err => {
        if (err) throw err;
        res.clearCookie("session").send("OK");
    });
};

export default {
    url: "/auth/logout",
    method: "POST",
    handler,
} as RouteOptions;
