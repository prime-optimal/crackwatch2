import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import useSWR from "swr";

import { AxiosGamesPopular } from "@types";

import { ResponsiveImage } from "@components";

export default function Popular() {
    const { data } = useSWR<AxiosGamesPopular>("/games/popular");

    return (
        <Container>
            <Grid container>
                {data?.results.map(({ id, name, background_image }) => (
                    <Grid item xs={12} md={6} key={id}>
                        <Card>
                            <CardMedia sx={{ height: 160 }}>
                                <ResponsiveImage src={background_image} />
                            </CardMedia>
                            <Typography>{name}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
