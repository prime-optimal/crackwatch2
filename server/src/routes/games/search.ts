import { Static, Type } from "@sinclair/typebox";
import axios from "axios";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { RAWG_BASE, headers } from "@config";

import { minifyImageSrc } from "@utils/minify";

const querystring = Type.Object(
    {
        q: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false }
);
type Querystring = Static<typeof querystring>;

const handler: any = async (req: Req<{ Querystring: Querystring }>) => {
    const { q } = req.query;

    const { data } = await axios.get<AxiosGames>(
        urlCat(RAWG_BASE, "/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            search: q,
            page_size: 10,
        }),
        { headers }
    );

    // minify images
    const results = data.results.map(({ background_image, ...rest }) => ({
        background_image: minifyImageSrc(background_image),
        ...rest,
    }));

    return { ...data, results, next: !!data.next, previous: !!data.previous };
};

export default (): Resource => ({
    get: {
        handler,
        schema: { querystring },
    },
});
