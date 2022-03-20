import { GetStaticProps } from "next";
import { SWRConfig } from "swr";

import { PageProps } from "@types";

import Index from "@routes/idx";

import FetchGames from "@lib/fetch-games";

export const getStaticProps: GetStaticProps = async () => {
    const result = await FetchGames();

    return {
        props: {
            fallback: {
                games: { ...result, next: true },
            },
        },
        revalidate: 60 * 60 * 24 * 2,
    };
};

export default function Page({ fallback }: PageProps) {
    return (
        <SWRConfig value={{ fallback }}>
            <Index />
        </SWRConfig>
    );
}
