import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { userModel } from "@mongo";

const body = Type.Object(
    {
        nickname: Type.String({ maxLength: 20, minLength: 1 }),
    },
    { additionalProperties: false }
);

type Body = Static<typeof body>;

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { nickname } = req.body;

    const user = await userModel.findOne({ nickname });
    return !user;
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
