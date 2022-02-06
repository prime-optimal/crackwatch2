import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import { AxiosGames } from "@types";

import { SWRImmutable } from "@config";

import { GameCard, IconTypography } from "@components";

import { onServer } from "@utils";

import BackToTop from "./BackToTop";
import Filters from "./Filters";
import { useStore } from "./store";

const Title = () => {
    const months = useStore(store => store.state.filters.applied.months);

    const formatted = useMemo(() => {
        if (onServer()) return "";

        const settings: Intl.DateTimeFormatOptions = {
            year: "2-digit",
            month: "short",
        };

        const firstDate = new Date().setMonth(new Date().getMonth() + months[0]);
        const secondDate = new Date().setMonth(new Date().getMonth() + months[1]);

        const first = new Date(firstDate).toLocaleDateString(
            window.navigator.language,
            settings
        );
        const second = new Date(secondDate).toLocaleDateString(
            window.navigator.language,
            settings
        );

        return `${first} - ${second}`;
    }, [months]);

    return (
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h4" }}
                icon={<SportsEsportsIcon fontSize="large" />}
            >
                Games{" "}
                <Typography component="span" variant="h6">
                    {formatted}
                </Typography>
            </IconTypography>

            <Filters />
        </Stack>
    );
};

export default function Index() {
    const months = useStore(store => store.state.filters.applied.months);

    const { data, setSize } = useSWRInfinite<AxiosGames>((index, previous) => {
        if (previous && !previous.next) return null;
        const page = encodeURIComponent(index + 1);
        const period = encodeURIComponent(`${months[0]},${months[1]}`);

        return `/games?page=${page}&period=${period}`;
    }, SWRImmutable);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!inView) return;
        setSize(x => x + 1);
    }, [inView, setSize]);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Title />

            <Grid container spacing={6}>
                {data?.map(({ results }) =>
                    results.map(
                        ({ id, name, background_image, clip, genres, metacritic, slug }) => (
                            <Grid item xs={12} md={6} lg={4} key={id}>
                                <GameCard
                                    genres={genres.map(x => x.name)}
                                    video={clip?.clip}
                                    img={background_image}
                                    name={name}
                                    metacritic={metacritic ? metacritic : undefined}
                                    slug={slug}
                                />
                            </Grid>
                        )
                    )
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
