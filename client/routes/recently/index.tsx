import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosCrackRecently } from "@types";

import { SWRImmutable } from "@config";

import GameTable from "./GameTable";

export default function Recently() {
    const { data, setSize, isValidating } = useSWRInfinite<AxiosCrackRecently>(
        (index, prev) => {
            if (prev && !prev.next) return null;
            return urlCat("/crack/recently", { page: index + 1 });
        },
        SWRImmutable
    );

    return (
        <Container maxWidth="xl">
            <Head>
                <title>Recently cracked</title>
            </Head>

            <Typography mt={3} align="center" gutterBottom variant="h4">
                Recently cracked
            </Typography>

            <Stack component={Paper} p={1} justifyContent="center" alignItems="center">
                <GameTable data={data} />

                <Box my={3} mb={1}>
                    <Button
                        endIcon={<ExpandMoreIcon />}
                        variant="contained"
                        onClick={() => setSize(size => size + 1)}
                        disabled={isValidating}
                    >
                        Load more
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
