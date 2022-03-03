import { Resource } from "fastify-autoroutes";

import { AxiosGameStatusLast, AxiosSteamCrackedGamesLast } from "@types";

import { crackClient } from "@utils/axios";

interface CrackedItem {
    title: string;
    date: string;
    img: string;
    status: string;
}

const steamCrackedGamesUrl = "https://steamcrackedgames.com/api/games/page/1/order/2";
const gameStatusUrl = "https://gamestatus.info/back/api/gameinfo/game/lastcrackedgames/";

const genStatus = (first: string, second: string) => {
    const day = 1000 * 60 * 60 * 24;
    const firstDate = new Date(first).getTime();
    const secondDate = new Date(second).getTime();

    return Math.round(Math.abs(firstDate - secondDate) / day);
};

const handler: any = () => {
    const steamCrackedGames: Promise<CrackedItem[]> = crackClient
        .get<AxiosSteamCrackedGamesLast>(steamCrackedGamesUrl)
        .then(({ data }) =>
            data.games.map(({ cracked_date_1, release_date, name, header_image }) => ({
                date: release_date,
                title: name,
                img: header_image,
                status: `Cracked in ${genStatus(cracked_date_1, release_date)} days`,
            }))
        );

    return steamCrackedGames;
};

export default (): Resource => ({
    get: {
        handler,
    },
});
