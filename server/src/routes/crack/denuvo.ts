import { Static, Type } from "@sinclair/typebox";
import * as cheerio from "cheerio";
import { FastifyRequest } from "fastify";
import { Resource } from "fastify-autoroutes";

import { crackClient } from "@utils/axios";

const querystring = Type.Object(
    {
        // 0 - not cracked
        // 1 - cracked
        // 2 - all
        type: Type.Integer({ default: 0 }),
    },
    { additionalProperties: false }
);

type Querystring = Static<typeof querystring>;

const url = "https://steamcrackedgames.com/search?q=denuvo";

const handler: any = async (req: FastifyRequest<{ Querystring: Querystring }>) => {
    const { type } = req.query;

    const $ = cheerio.load(await crackClient.get(url).then(x => x.data));

    const rows = $("#tbody_games").find("tr");

    const items: any = [];
    rows.each((i, el) => {
        const element = $(el);

        if (type === 0 && element.find(".cracked-text").length) {
            return;
        }

        if (type === 1 && !element.find(".cracked-text").length) {
            return;
        }

        items.push({
            title: element.find("a").eq(1).text().trim(),
            released: element.find("td").eq(1).text() || null,
            cracked: element.find("td").eq(2).text() || null,
            img: element.find("img").attr("data-src"),
        });
    });

    return items;
};

export default (): Resource => ({
    get: {
        handler,
        schema: { querystring },
    },
});
