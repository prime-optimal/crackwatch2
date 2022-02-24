import { Container, Grid } from "@mui/material";
import Head from "next/head";

import BackToTop from "./BackToTop";
import Filters from "./Filters";
import Games from "./Games";

export default function Index() {
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

            <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={3}>
                    <Filters />
                </Grid>

                <Grid item xs>
                    <Games />
                </Grid>
            </Grid>

            <BackToTop />
        </Container>
    );
}
