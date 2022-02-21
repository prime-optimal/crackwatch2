import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { authenticate } from "@hooks/authenticate";

import { getAccount } from "@utils/mongo";

const handlerGet: any = async (req: Req) => {
    const account = await getAccount(req);
    return account.settings;
};

const bodyPut = Type.Object(
    {
        notifications: Type.Boolean(),
    },
    { additionalProperties: false }
);
type BodyPut = Static<typeof bodyPut>;

const handlerPut: any = async (req: Req<{ Body: BodyPut }>) => {
    const account = await getAccount(req);

    account.settings = req.body;
    await account.save();

    return account.settings;
};

export default (): Resource => ({
    get: {
        handler: handlerGet,
        onRequest: authenticate,
    },
    put: {
        handler: handlerPut,
        schema: { body: bodyPut },
        onRequest: authenticate,
    },
});
