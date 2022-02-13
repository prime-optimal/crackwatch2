import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame, AxiosGameScreenshots } from "@types";

import { Carousel } from "@components";

export default function Game() {
    const { slug = null } = useRouter().query;

    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);
    const { data: screenshots } = useSWR<AxiosGameScreenshots>(
        slug && `/game/${slug}/screenshots`
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Grid container>
                <Grid item xs={12} height={300} md={6} lg={4}>
                    <Carousel
                        images={screenshots?.results.map(screenshot => screenshot.image)}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
