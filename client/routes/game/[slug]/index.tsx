import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

import Media from "./Media";

export default function Game() {
    const { slug = null } = useRouter().query;

    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">{data?.name}</Typography>
                </Grid>

                <Grid item xs={12} md={6} height={400}>
                    <Media />
                </Grid>
            </Grid>
        </Container>
    );
}
