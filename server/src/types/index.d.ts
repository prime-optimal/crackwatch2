declare module "fastify" {
    interface Session {
        user?: {
            email: string;
            nickname: string;
            avatar: string;
        };
    }
}

// Generated by https://quicktype.io

export interface AxiosGames {
    count: number;
    next: null | string;
    previous: null | string;
    results: Result[];
    user_platforms: boolean;
}

export interface Result {
    slug: string;
    name: string;
    playtime: number;
    platforms: Platform[];
    stores: Store[] | null;
    released: string;
    tba: boolean;
    background_image: string | null;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus | null;
    metacritic: number;
    suggestions_count: number;
    updated: string;
    id: number;
    score: null;
    clip: Clip | null;
    tags: Tag[];
    esrb_rating: EsrbRating | null;
    user_game: null;
    reviews_count: number;
    saturated_color: Color;
    dominant_color: Color;
    short_screenshots: ShortScreenshot[];
    parent_platforms: Platform[];
    genres: Genre[];
    community_rating?: number;
}

export interface AddedByStatus {
    yet?: number;
    owned: number;
    beaten?: number;
    toplay: number;
    dropped?: number;
    playing?: number;
}

export interface Clip {
    clip: string;
    clips: { [key: string]: string };
    video: string;
    preview: string;
}

export enum Color {
    The0F0F0F = "0f0f0f",
}

export interface EsrbRating {
    id: number;
    name: Name;
    slug: Slug;
    name_en: Name;
    name_ru: Name;
}

export enum Name {
    Everyone = "Everyone",
    Everyone10 = "Everyone 10+",
    Teen = "Teen",
}

export enum Slug {
    Everyone = "everyone",
    Everyone10Plus = "everyone-10-plus",
    Teen = "teen",
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Platform {
    platform: Genre;
}

export interface Rating {
    id: number;
    title: Title;
    count: number;
    percent: number;
}

export enum Title {
    Exceptional = "exceptional",
    Meh = "meh",
    Recommended = "recommended",
    Skip = "skip",
}

export interface ShortScreenshot {
    id: number;
    image: string;
}

export interface Store {
    store: Genre;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: Language;
    games_count: number;
    image_background: string;
}

export enum Language {
    Eng = "eng",
    Rus = "rus",
}
