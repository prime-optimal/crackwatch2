import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import fuzzysort from "fuzzysort";

import { AxiosGameStatusLast, AxiosSteamCrackedGamesLast } from "@types";

import { crackClient } from "@utils/axios";

interface CrackedItem {
    title: string;
    date: string;
    img: string;
    status: string;
}

const querystring = Type.Object(
    {
        page: Type.Integer({ default: 1, minimum: 1 }),
    },
    { additionalProperties: false }
);

type Querystring = Static<typeof querystring>;

const steamCrackedGamesUrl = "https://steamcrackedgames.com/api/games/page/1/order/2";
const gameStatusUrl = "https://gamestatus.info/back/api/gameinfo/game/lastcrackedgames/";

const genStatus = (first: string, second: string) => {
    const day = 1000 * 60 * 60 * 24;
    const firstDate = new Date(first).getTime();
    const secondDate = new Date(second).getTime();

    return Math.round(Math.abs(firstDate - secondDate) / day);
};

const fuzzyOptions: Fuzzysort.Options = {
    allowTypo: false,
    limit: 2,
    threshold: -4,
};

const handler: any = async (req: Req<{ Querystring: Querystring }>) => {
    const [steamCrackedGames, gameStatus] = await Promise.allSettled([
        crackClient.get<AxiosSteamCrackedGamesLast>(steamCrackedGamesUrl),
        crackClient.get<AxiosGameStatusLast>(gameStatusUrl),
    ]);

    let crackedItems: CrackedItem[] = [];

    if (steamCrackedGames.status === "fulfilled") {
        const items: CrackedItem[] = steamCrackedGames.value.data.games
            // filter out incorrect values
            .filter(
                ({ cracked_date_1 }) =>
                    new Date(cracked_date_1).getTime() <= new Date().getTime()
            )
            .map(({ header_image, cracked_date_1, name, release_date }) => ({
                date: cracked_date_1,
                img: header_image,
                title: name,
                status: `Cracked in ${genStatus(cracked_date_1, release_date)} days`,
            }));

        crackedItems = [...crackedItems, ...items];
    }

    if (gameStatus.status === "fulfilled") {
        const items: CrackedItem[] = gameStatus.value.data.list_crack_games
            // filter out incorrect values
            .filter(({ crack_date }) => new Date(crack_date).getTime() <= new Date().getTime())
            .map(({ readable_status, title, crack_date, short_image }) => ({
                date: crack_date,
                img: short_image,
                status: readable_status,
                title,
            }));

        crackedItems = [...crackedItems, ...items];
    }

    // rm duplicates
    for await (const [index, { title }] of crackedItems.entries()) {
        const cut = title.slice(0, title.length - 2);
        const results = await fuzzysort.goAsync(cut, crackedItems, {
            ...fuzzyOptions,
            key: "title",
        });

        if (results.length >= 2) {
            crackedItems.splice(index, 1);
        }
    }

    crackedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const { page } = req.query;

    const items = crackedItems.slice((page - 1) * 10, page * 10);

    // page = 1 slice(0, 10)
    // page = 2 slice(10, 20)

    return {
        items,
        next: crackedItems.length > page * 10,
    };
};

export default (): Resource => ({
    get: {
        handler,
        schema: { querystring },
    },
});
