import { Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

import GameTable from "./GameTable";

export default function Denuvo() {
    const [type, setType] = useState(0);

    return (
        <Container maxWidth="xl">
            <Head>
                <title>Denuvo games</title>
            </Head>

            <Typography align="center" variant="h4" my={3}>
                Denuvo games
            </Typography>

            <Tabs centered value={type} onChange={(_, value) => setType(value)}>
                <Tab label="Not cracked" value={0} />
                <Tab label="Cracked" value={1} />
                <Tab label="All" value={2} />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            <GameTable type={type} />
        </Container>
    );
}
