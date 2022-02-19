import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { rawgClient } from "@utils/axios";
import { minifyImageSrc } from "@utils/minify";

const querystring = Type.Object(
    {
        page: Type.Number({ default: 1, minimum: 1 }),
        period: Type.String({ default: "-6,0" }),
    },
    { additionalProperties: false }
);
type Querystring = Static<typeof querystring>;

const setMonth = (date: Date, by: number) =>
    new Date(date.setMonth(new Date(date).getMonth() + by));

const handler: any = async (req: Req<{ Querystring: Querystring }>) => {
    const { page, period } = req.query;

    const [from, to] = period.split(",");

    const dates =
        setMonth(new Date(), Number(from)).toLocaleDateString("lt-LT") +
        "," +
        setMonth(new Date(), Number(to)).toLocaleDateString("lt-LT");

    const { data } = await rawgClient.get<AxiosGames>(
        urlCat("/games", {
            key: process.env.RAWG_KEY,
            platforms: "4",
            page_size: 30,
            ordering: "-added",
            dates,
            page,
        }),
        { ttl: 60 * 60 * 24 }
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
