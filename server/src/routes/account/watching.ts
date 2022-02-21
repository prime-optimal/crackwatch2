import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { authenticate } from "@hooks/authenticate";

import ErrorBuilder from "@utils/errorBuilder";
import { getAccount } from "@utils/mongo";

const bodyPut = Type.Object(
    {
        item: Type.String({ maxLength: 300, minLength: 1 }),
        slug: Type.String({ maxLength: 300, minLength: 1 }),
    },
    { additionalProperties: false }
);
type BodyPut = Static<typeof bodyPut>;

const handlerPut: any = async (req: Req<{ Body: BodyPut }>) => {
    const { item, slug } = req.body;

    const account = await getAccount(req);

    if (account.watching.find(game => game.slug === slug)) {
        throw new ErrorBuilder().status(400).msg("You are already watching this game");
    }

    account.watching.push({ item, slug, started: new Date() });
    await account.save();

    return account.watching;
};

const queryDelete = Type.Object(
    {
        slug: Type.String({ maxLength: 300, minLength: 1 }),
    },
    { additionalProperties: false }
);
type QueryDelete = Static<typeof queryDelete>;

const handlerDelete: any = async (req: Req<{ Querystring: QueryDelete }>) => {
    const { slug } = req.query;

    const account = await getAccount(req);

    for (const [i, game] of account.watching.entries()) {
        if (game.slug === slug) {
            account.watching.splice(i, 1);
            break;
        }
    }

    await account.save();

    return account.watching;
};

const handlerGet: any = async (req: Req) => {
    const account = await getAccount(req);
    return account.watching;
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
    delete: {
        handler: handlerDelete,
        schema: { querystring: queryDelete },
        onRequest: authenticate,
    },
});
