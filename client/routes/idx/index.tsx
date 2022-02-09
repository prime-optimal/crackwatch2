import WhatshotIcon from "@mui/icons-material/Whatshot";
import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import { AxiosGames } from "@types";

import { SWRImmutable } from "@config";

import { GameCard, IconTypography } from "@components";

import BackToTop from "./BackToTop";

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
    const { data, setSize } = useSWRInfinite<AxiosGames>((index, previous) => {
        if (previous && !previous.next) return null;

        const page = encodeURIComponent(index + 1);
        return `/games?page=${page}`;
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
                            <Grid item xs={12} md={6} lg={4} xl={3} key={id}>
                                <GameCard
                                    genres={genres.map(x => x.name)}
                                    video={clip?.clip}
                                    img={background_image}
                                    name={name}
                                    metacritic={metacritic ? metacritic : undefined}
                                    slug={slug}
                                    preview={clip?.preview}
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
