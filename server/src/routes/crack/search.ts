import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import tryToCatch from "@utils/catch";
import Providers from "@utils/searchers";

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

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { providers, query } = req.body;

    // filter out the needed providers
    const filtered = Providers.filter(({ provider }) => providers.includes(provider));

    if (filtered.length < 1) {
        throw {
            status: 400,
            message: "Unknown providers ¯\\_(ツ)_/¯",
        };
    }

    // this only looks complex
    const promises = filtered.map(
        ({ search, provider }) =>
            new Promise((resolve, reject) => {
                search(query)
                    .then(result => {
                        if (result.length < 1) reject(`${provider} does not have cracks`);
                        else resolve({ provider, result });
                    })
                    .catch(() => reject(`${provider} did not respond`));
            })
    );

    const [result, error] = await tryToCatch(() => Promise.any(promises));

    if (!result) {
        throw {
            status: 404,
            message: (error as AggregateError).errors.join(" - "),
        };
    }

    return result;
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
