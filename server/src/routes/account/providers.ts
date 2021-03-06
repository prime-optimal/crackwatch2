import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { authenticate } from "@hooks/authenticate";

import { getAccount } from "@utils/mongo";

const bodyPut = Type.Object(
    {
        providers: Type.Array(Type.String({ maxLength: 100 }), { default: [] }),
    },
    { additionalProperties: false }
);
type BodyPut = Static<typeof bodyPut>;

const handlerPut: any = async (req: Req<{ Body: BodyPut }>) => {
    const { providers } = req.body;

    const account = await getAccount(req);

    account.providers = providers as any;
    await account.save();

    return account.providers;
};

const handlerGet: any = async (req: Req) => {
    const account = await getAccount(req);
    return account.providers;
};

export default (): Resource => ({
    put: {
        handler: handlerPut,
        schema: { body: bodyPut },
        onRequest: authenticate,
    },
    get: {
        handler: handlerGet,
        onRequest: authenticate,
    },
});
