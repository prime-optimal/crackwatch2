import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import SSRAxios from "@utils/ssr-axios";

import Game from "@routes/game/[slug]";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { slug } = params as any;
    const { data } = await SSRAxios(`/game/${slug}`);

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
