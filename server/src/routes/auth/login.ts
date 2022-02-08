import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req, RouteOptions } from "fastify";

const body = Type.Object(
    {
        password: Type.String(),
        email: Type.String(),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const handler = async (req: Req<{ Body: Body }>) => {
    return req.body;
};

export default {
    url: "/auth/login",
    method: "POST",
    handler,
    schema: { body },
} as RouteOptions;
