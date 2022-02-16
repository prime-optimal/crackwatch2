import { Static, Type } from "@sinclair/typebox";
import axios from "axios";
import { FastifyRequest as Req, RouteOptions } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { RAWG_BASE } from "@config";

const params = Type.Object(
    {
        slug: Type.String(),
    },
    { additionalProperties: false }
);
type Params = Static<typeof params>;

const handler: any = async (req: Req<{ Params: Params }>) => {
    const { slug } = req.params;

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games/:slug", {
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
