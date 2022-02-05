import WhatshotIcon from "@mui/icons-material/Whatshot";
import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { AxiosGamesPopular } from "@types";

import { GameCard, IconTypography } from "@components";

const getKey: SWRInfiniteKeyLoader = (index, previous) => {
    if (previous && !previous.next) return null;
    return `/games/popular?page=${index + 1}`;
};

export default function Popular() {
    const { data, setSize } = useSWRInfinite<AxiosGamesPopular>(getKey);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!inView) return;
        setSize(x => x + 1);
    }, [inView, setSize]);

    return (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h4" }}
                icon={<WhatshotIcon fontSize="large" />}
            >
                Popular
            </IconTypography>

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
                            />
                        </Grid>
                    ))
                )}
            </Grid>

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
