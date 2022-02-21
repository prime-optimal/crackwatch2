export interface PageProps {
    fallback: any;
    error?: {
        status: string;
        data: string;
    };
}

export type Provider =
    | "1337x"
    | "gamestatus"
    | "pcgamestorrents"
    | "skidrow"
    | "steamcrackedgames";

interface Watching {
    cracked: boolean;
    item: string;
    slug: string;
    started: string;
}

// Generated by https://quicktype.io

export interface AxiosCrackSearch {
    provider: string;
    result: CrackSearchResult[];
}

export interface CrackSearchResult {
    item: string;
    refIndex: number;
    score: number;
}

// Generated by https://quicktype.io
export interface AxiosGameScreenshots {
    count: number;
    next: null;
    previous: null;
    results: ResultGameScreenshots[];
}

export interface ResultGameScreenshots {
    id: number;
    image: string;
    width: number;
    height: number;
    is_deleted: boolean;
}

// Generated by https://quicktype.io
export interface AxiosGames {
    count: number;
    next: boolean;
    previous: boolean;
    results: ResultGames[];
    user_platforms: boolean;
}

export interface ResultGames {
    background_image: string;
    slug: string;
    name: string;
    playtime: number;
    platforms: PlatformGames[];
    stores: StoreGames[];
    released: string;
    tba: boolean;
    rating: number;
    rating_top: number;
    ratings: RatingGames[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatusGames;
    metacritic: number | null;
    suggestions_count: number;
    updated: string;
    id: number;
    score: null;
    clip: ClipGames | null;
    tags: TagGames[];
    esrb_rating: EsrbRatingGames | null;
    user_game: null;
    reviews_count: number;
    saturated_color: ColorGames;
    dominant_color: ColorGames;
    short_screenshots: ShortScreenshotGames[];
    parent_platforms: PlatformGames[];
    genres: GenreGames[];
}

export interface AddedByStatusGames {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped?: number;
    playing?: number;
}

export interface ClipGames {
    clip: string;
    clips: { [key: string]: string };
    video: string;
    preview: string;
}

export enum ColorGames {
    The0F0F0F = "0f0f0f",
}

export interface EsrbRatingGames {
    id: number;
    name: string;
    slug: string;
    name_en: string;
    name_ru: string;
}

export interface GenreGames {
    id: number;
    name: string;
    slug: string;
}

export interface PlatformGames {
    platform: GenreGames;
}

export interface RatingGames {
    id: number;
    title: TitleGames;
    count: number;
    percent: number;
}

export enum TitleGames {
    Exceptional = "exceptional",
    Meh = "meh",
    Recommended = "recommended",
    Skip = "skip",
}

export interface ShortScreenshotGames {
    id: number;
    image: string;
}

export interface StoreGames {
    store: GenreGames;
}

export interface TagGames {
    id: number;
    name: string;
    slug: string;
    language: LanguageGames;
    games_count: number;
    image_background: string;
}

export enum LanguageGames {
    Eng = "eng",
    Rus = "rus",
}

// Generated by https://quicktype.io
export interface AxiosGame {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: number;
    metacritic_platforms: MetacriticPlatformGame[];
    released: string;
    tba: boolean;
    updated: string;
    background_image: string;
    background_image_additional: string;
    website: string;
    rating: number;
    rating_top: number;
    ratings: RatingGame[];
    reactions: { [key: string]: number };
    added: number;
    added_by_status: AddedByStatusGame;
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: any[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    parent_platforms: ParentPlatformGame[];
    platforms: PlatformElementGame[];
    stores: Game[];
    developers: DeveloperGame[];
    genres: DeveloperGame[];
    tags: DeveloperGame[];
    publishers: DeveloperGame[];
    esrb_rating: EsrbRatingGame;
    clip: ClipGame;
    description_raw: string;
}

export interface AddedByStatusGame {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

export interface ClipGame {
    clip: string;
    clips: { [key: string]: string };
    video: string;
    preview: string;
}

export interface DeveloperGame {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    domain?: string;
    language?: LanguageGame;
}

export enum LanguageGame {
    Eng = "eng",
}

export interface EsrbRatingGame {
    id: number;
    name: string;
    slug: string;
}

export interface MetacriticPlatformGame {
    metascore: number;
    url: string;
    platform: MetacriticPlatformPlatformGame;
}

export interface MetacriticPlatformPlatformGame {
    platform: number;
    name: string;
    slug: string;
}

export interface ParentPlatformGame {
    platform: EsrbRatingGame;
}

export interface PlatformElementGame {
    platform: PlatformPlatformGame;
    released_at: string;
    requirements: RequirementsGame;
}

export interface PlatformPlatformGame {
    id: number;
    name: string;
    slug: string;
    image: null;
    year_end: null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface RequirementsGame {
    minimum?: string;
    recommended?: string;
}

export interface RatingGame {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface Game {
    id: number;
    url: string;
    store: DeveloperGame;
}
