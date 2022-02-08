import { Static, Type } from "@sinclair/typebox";
import { randomBytes } from "crypto";
import { FastifyRequest as Req, RouteOptions } from "fastify";

const body = Type.Object(
    {
        nickname: Type.String({ minLength: 4, maxLength: 20 }),
        password: Type.String({ minLength: 6, maxLength: 100 }),
        email: Type.String({ maxLength: 100 }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const handler = async (req: Req<{ Body: Body }>) => {
    return req.body;
};

export default {
    url: "/auth/register",
    method: "POST",
    handler,
    schema: { body },
} as RouteOptions;
