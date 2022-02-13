import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame, AxiosGameScreenshots } from "@types";

import Carousel from "@components/Carousel";

export default function Game() {
    const { slug = null } = useRouter().query;

    const { data: game } = useSWR<AxiosGame>(slug && `/game/${slug}`);
    const { data: screenshots } = useSWR<AxiosGameScreenshots>(
        slug && `/game/${slug}/screenshots`
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">{game?.name}</Typography>
                </Grid>

                <Grid item xs={12} md={6} height={400}>
                    <Carousel
                        images={screenshots?.results.map(screenshot => screenshot.image)}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
