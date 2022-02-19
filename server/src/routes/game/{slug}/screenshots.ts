import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { rawgClient } from "@utils/axios";

const params = Type.Object(
    {
        slug: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false }
);
type Params = Static<typeof params>;

const handler: any = async (req: Req<{ Params: Params }>) => {
    const { slug } = req.params;

    const { data } = await rawgClient.get(
        urlCat("/games/:slug/screenshots", {
            key: process.env.RAWG_KEY,
            slug,
        })
    );

    return data;
};

export default (): Resource => ({
    get: {
        handler,
        schema: { params },
    },
});
