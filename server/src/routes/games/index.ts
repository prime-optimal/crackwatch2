import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { rawgClient } from "@utils/axios";
import { minifyImageSrc } from "@utils/minify";
import pick from "@utils/pick";

const querystring = Type.Object(
    {
        page: Type.Number({ default: 1, minimum: 1 }),
        dates: Type.String({ default: "-6,0" }),
        ordering: Type.String({ default: "-added" }),
    },
    { additionalProperties: false }
);
type Querystring = Static<typeof querystring>;

const setMonth = (date: Date, by: number) =>
    new Date(date.setMonth(new Date(date).getMonth() + by));

const handler: any = async (req: Req<{ Querystring: Querystring }>) => {
    const { page, dates: period, ordering } = req.query;

    const [from, to] = period.split(",");

    const dates =
        setMonth(new Date(), Number(from)).toLocaleDateString("lt-LT") +
        "," +
        setMonth(new Date(), Number(to)).toLocaleDateString("lt-LT");

    const { data } = await rawgClient.get<AxiosGames>(
        urlCat("/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 8,
            ordering,
            dates,
            page,
        })
    );

    // minify images
    const results = data.results.map(({ background_image, ...rest }) => ({
        background_image: minifyImageSrc(background_image),
        ...rest,
    }));

    const picked = pick(results, [
        "id",
        "name",
        "background_image",
        "clip",
        "genres",
        "slug",
        "released",
    ]);

    return {
        results: picked,
        next: !!data.next,
        previous: !!data.previous,
    };
};

export default (): Resource => ({
    get: {
        handler,
        schema: { querystring },
    },
});
