import { CrackProvider } from "@types";

import OneThreeThreeSeven from "./1337x";
import GameStatus from "./gamestatus";
import PcGamesTorrents from "./pcgamestorrents";
import Skidrow from "./skidrow";
import SteamCrackedGames from "./steamcrackedgames";

export const Providers: CrackProvider[] = [
    OneThreeThreeSeven,
    GameStatus,
    PcGamesTorrents,
    Skidrow,
    SteamCrackedGames,
];

export const ProviderTiers = {
    s: [GameStatus.provider, SteamCrackedGames.provider],
    b: [PcGamesTorrents.provider, Skidrow.provider],
    c: [OneThreeThreeSeven.provider],
};
