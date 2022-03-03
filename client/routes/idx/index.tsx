import { Container, Grid, Stack } from "@mui/material";
import Head from "next/head";

import useBreakpoint from "@hooks/useBreakpoint";

import BackToTop from "./BackToTop";
import Filters from "./Filters";
import Games from "./Games";
import TopReddit from "./TopReddit";

const Side = () => {
    const mobile = useBreakpoint("md");

    return (
        <Stack
            spacing={3}
            overflow="auto"
            height={mobile ? "auto" : "100vh"}
            position="sticky"
            top={theme => theme.spacing(3)}
        >
            <Filters />
            <TopReddit />
        </Stack>
    );
};

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

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} xl={3}>
                    <Side />
                </Grid>

                <Grid item xs>
                    <Games />
                </Grid>
            </Grid>

            <BackToTop />
        </Container>
    );
}
