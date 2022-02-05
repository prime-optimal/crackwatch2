import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { AxiosGames } from "@types";

import { SWRImmutable } from "@config";

import { GameCard, IconTypography } from "@components";

import BackToTop from "./BackToTop";
import Filters from "./Filters";

const getKey: SWRInfiniteKeyLoader = (index, previous) => {
    if (previous && !previous.next) return null;
    return `/games?page=${index + 1}`;
};

export default function Index() {
    const { data, setSize } = useSWRInfinite<AxiosGames>(getKey, SWRImmutable);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (!inView) return;
        setSize(x => x + 1);
    }, [inView, setSize]);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <IconTypography
                    sx={{ mb: 2 }}
                    props={{ variant: "h4" }}
                    icon={<SportsEsportsIcon fontSize="large" />}
                >
                    Games
                </IconTypography>

                <Filters />
            </Stack>

            <Grid container spacing={6}>
                {data?.map(({ results }) =>
                    results.map(({ id, name, background_image, clip, genres, metacritic }) => (
                        <Grid item xs={12} md={6} lg={4} key={id}>
                            <GameCard
                                genres={genres.map(x => x.name)}
                                video={clip?.clip}
                                img={background_image}
                                name={name}
                                metacritic={metacritic ? metacritic : undefined}
                                id={id}
                            />
                        </Grid>
                    ))
                )}
            </Grid>

            <BackToTop />
            <Stack
                p={3}
                justifyContent="center"
                alignItems="center"
                mt={1}
                ref={data ? ref : undefined}
            >
                <CircularProgress />
            </Stack>
        </Container>
    );
}
