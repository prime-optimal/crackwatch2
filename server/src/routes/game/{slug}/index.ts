import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { rawgClient } from "@utils/axios";
import pick from "@utils/pick";

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
        urlCat("/games/:slug", {
            key: process.env.RAWG_KEY,
            slug,
        })
    );

    return pick(data, [
        "stores",
        "slug",
        "name",
        "released",
        "description_raw",
        "developers",
        "publishers",
        "genres",
        "website",
        "background_image_additional",
        "background_image",
        "metacritic",
        "rating",
    ]);
};

export default (): Resource => ({
    get: {
        handler,
        schema: { params },
    },
});
