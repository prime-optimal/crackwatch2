import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req, RouteOptions } from "fastify";

import { userModel } from "@mongo";

const body = Type.Object(
    {
        nickname: Type.String({ maxLength: 20 }),
    },
    { additionalProperties: false }
);

type Body = Static<typeof body>;

export const handler = async (req: Req<{ Body: Body }>) => {
    const { nickname } = req.body;

    const user = await userModel.findOne({ nickname });
    return !user;
};

export default {
    method: "POST",
    url: "/validate/nickname",
    handler,
} as RouteOptions;
