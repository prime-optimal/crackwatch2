import axios from "axios";
import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";
import urlCat from "urlcat";

import { PageProps } from "@types";

import { RAWG_BASE } from "@config";

import Game from "@routes/game/[slug]";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { slug } = params as any;

    const { data } = await axios.get(
        urlCat(RAWG_BASE, "/games/:slug", {
            key: process.env.RAWG_KEY,
            slug,
        })
    );

    return {
        props: {
            fallback: {
                [`/game/${slug}`]: data,
            },
        },
    };
};

export default function Page({ fallback }: PageProps) {
    return (
        <SWRConfig value={{ fallback }}>
            <Game />
        </SWRConfig>
    );
}
