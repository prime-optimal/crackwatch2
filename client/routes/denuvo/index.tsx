import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";

import GameTable from "./GameTable";

export default function Denuvo() {
    const [value, setValue] = useState(0);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Head>
                <title>Denuvo games</title>
            </Head>
            <Typography align="center" gutterBottom variant="h4">
                Denuvo games
            </Typography>

            <FormControl sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                    label="Type"
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                    fullWidth
                >
                    <MenuItem value={0}>Uncracked</MenuItem>
                    <MenuItem value={1}>Cracked</MenuItem>
                    <MenuItem value={2}>All</MenuItem>
                </Select>
            </FormControl>

            <GameTable type={value} />
        </Container>
    );
}
