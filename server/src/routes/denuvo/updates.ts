import { Static, Type } from "@sinclair/typebox";
import * as cheerio from "cheerio";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import urlCat from "urlcat";

import { AxiosDenuvoUpdates } from "@types";

import { crackClient } from "@utils/axios";

const querystring = Type.Object(
    {
        page: Type.Integer({ default: 1, minimum: 1 }),
        // 0 - recent news
        // 1 - new releases
        // 2 - games that had denuvo removed (idk how though, they use custom binary parser for api res)
        type: Type.Integer({ default: 0, minimum: 0, maximum: 1 }),
    },
    { additionalProperties: false }
);

type Querystring = Static<typeof querystring>;

interface DenuvoUpdate {
    img: string | null;
    price: string;
    status: string;
    date: string;
    steam: string | null;
}

const BASE_URL =
    "https://store.steampowered.com/curator/26095454-Denuvo-Games/ajaxgetfilteredrecommendations/";

const handler: any = async (req: Req<{ Querystring: Querystring }>) => {
    const { page, type } = req.query;

    let sort = "";
    switch (type) {
        case 0:
            sort = "recent";
            break;
        case 1:
            sort = "newreleases";
            break;
    }

    const { data } = await crackClient.get<AxiosDenuvoUpdates>(
        urlCat(BASE_URL, {
            start: (page - 1) * 10,
            count: 10,
            sort,
            reset: false,
        })
    );

    const $ = cheerio.load(data.results_html);

    const items: DenuvoUpdate[] = [];
    $("div.recommendation").each((i, el) => {
        const container = $(el);

        items.push({
            img: container.find("img").attr("src") || null,
            status: container.find("div.recommendation_desc").text().trim(),
            date: container.find("span.curator_review_date").text().trim(),
            price: container.find("div.discount_final_price").text().trim(),
            steam: container.find("a.recommendation_link").attr("href") || null,
        });
    });

    return {
        next: data.total_count > page * 10,
        items,
    };
};

export default (): Resource => ({
    get: {
        handler,
        schema: { querystring },
    },
});
