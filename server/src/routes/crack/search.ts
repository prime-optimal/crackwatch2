import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import SearchCrack from "@utils/searchers";

const body = Type.Object(
    {
        providers: Type.Array(Type.String({ minLength: 1, maxLength: 100 }), {
            minItems: 1,
            maxItems: 10,
        }),
        query: Type.String({ minLength: 1, maxLength: 250 }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const handler: any = (req: Req<{ Body: Body }>) => {
    const { providers, query } = req.body;

    return SearchCrack(query, providers);
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
