import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { accountModel } from "@mongo";

import { authenticate } from "@hooks/authenticate";

const body = Type.Object(
    {
        providers: Type.Array(Type.String({ maxLength: 100 }), { default: [] }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { providers } = req.body;

    const account = await accountModel.findOne({ userId: req.session.user?.id || null });
    if (!account) {
        throw {
            statusCode: 401,
            message: "Unexpected user not found",
        };
    }

    account.providers = providers as any;
    await account.save();

    return account.providers;
};

export default (): Resource => ({
    put: {
        handler,
        schema: { body },
        onRequest: authenticate,
    },
});
