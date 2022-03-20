import { Container, Typography } from "@mui/material";
import Head from "next/head";

import GameTable from "./GameTable";

export default function Recently() {
    return (
        <Container maxWidth="xl">
            <Head>
                <title>Recently cracked</title>
            </Head>

            <Typography my={3} align="center" variant="h4">
                Recently cracked
            </Typography>

            <GameTable />
        </Container>
    );
}
