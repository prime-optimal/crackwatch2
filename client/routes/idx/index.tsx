import WhatshotIcon from "@mui/icons-material/Whatshot";
import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { SWRImmutable } from "@config";

import GameCard from "@components/GameCard";
import IconTypography from "@components/IconTypography";

import BackToTop from "./BackToTop";
import { useStore } from "./store";

const Title = () => {
    return (
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h4" }}
                icon={<WhatshotIcon fontSize="large" />}
            >
                Popular
            </IconTypography>
        </Stack>
    );
};

export default function Index() {
    const filters = useStore(store => store.state.filters);

    const { data, setSize } = useSWRInfinite<AxiosGames>((index, previous) => {
        if (previous && !previous.next) return null;
        return urlCat("/games", { ...filters, page: index + 1 });
    }, SWRImmutable);

    console.log({ data });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!inView) return;
        setSize(x => x + 1);
    }, [inView, setSize]);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Head>
                <title>Crackwatch 2</title>
                <meta name="og:title" content="Crackwatch 2" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Crackwatch 2" />
                <meta
                    property="og:description"
                    content="Check up and watch your favorite game's crack status"
                />
            </Head>

            <Title />

            <Grid container spacing={6}>
                {data?.map(({ results }) =>
                    results.map(({ id, name, background_image, clip, genres, slug }) => (
                        <Grid item xs={12} md={6} lg={4} xl={3} key={id}>
                            <GameCard
                                genres={genres.map(x => x.name)}
                                video={clip?.clip}
                                img={background_image}
                                name={name}
                                slug={slug}
                                animations
                            />
                        </Grid>
                    ))
                )}
            </Grid>

            <BackToTop />

            {!data && (
                <Stack p={3} justifyContent="center" alignItems="center" mt={1}>
                    <CircularProgress />
                </Stack>
            )}

            {data?.[data.length - 1]?.next && (
                <Stack
                    p={3}
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                    ref={data ? ref : undefined}
                >
                    <CircularProgress />
                </Stack>
            )}
        </Container>
    );
}
