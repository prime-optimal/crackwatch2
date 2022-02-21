import {
    Avatar,
    Box,
    Container,
    Divider,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { dequal } from "dequal";
import Head from "next/head";
import { useState } from "react";

import useUser from "@hooks/useUser";

import Providers from "./Providers";
import Watching from "./Watching";

const items = [Watching, Providers].map((Item, index) => ({ Item, index }));

export default function Account() {
    const { data } = useUser({
        compare: (a, b) => dequal(a?.user, b?.user),
    });

    const [value, setValue] = useState(0);

    if (!data?.user.nickname) {
        return (
            <Typography align="center" variant="h3" mt={3}>
                Not logged in
            </Typography>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Head>
                <title>{`${data.user.nickname}'s account`}</title>
            </Head>
            <Box component={Paper} p={2}>
                <Stack
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar src={data.user.avatar} sx={{ width: 100, height: 100 }} />
                    <Typography ml={1} variant="h3">
                        {data.user.nickname}
                        <Typography color="text.secondary">{data.user.email}</Typography>
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Tabs centered value={value} onChange={(_, value) => setValue(value)}>
                    <Tab label="Watching" value={0} />
                    <Tab label="Providers" value={1} />
                </Tabs>

                {items.map(({ index, Item }) => (
                    <Box key={index} hidden={index !== value} pt={2}>
                        <Item />
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
