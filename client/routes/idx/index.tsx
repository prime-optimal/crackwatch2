import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Container, Grid } from "@mui/material";
import useSWR from "swr";

import { AxiosGamesPopular } from "@types";

import { GameCard, IconTypography } from "@components";

export default function Popular() {
    const { data } = useSWR<AxiosGamesPopular>("/games/popular");

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
                {data?.results.map(
                    ({ id, name, background_image, clip, genres, metacritic }) => (
                        <Grid item xs={12} md={6} lg={4} key={id}>
                            <GameCard
                                genres={genres.map(x => x.name)}
                                video={clip?.clip}
                                img={background_image}
                                name={name}
                                metacritic={metacritic ? metacritic : undefined}
                            />
                        </Grid>
                    )
                )}
            </Grid>
        </Container>
    );
}
