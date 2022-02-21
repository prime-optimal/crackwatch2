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
import Head from "next/head";
import { useState } from "react";

import useUserMutation from "@hooks/mutations/useUserMutation";

import Providers from "./Providers";
import Settings from "./Settings";
import Watching from "./Watching";

const items = [Watching, Providers, Settings].map((Item, index) => ({ Item, index }));

export default function Account() {
    const { user } = useUserMutation();

    const [value, setValue] = useState(0);

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Head>
                <title>{`${user?.nickname}'s account`}</title>
            </Head>
            <Box component={Paper} p={2}>
                <Stack
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar src={user?.avatar} sx={{ width: 100, height: 100 }} />
                    <Typography ml={1} variant="h3">
                        {user?.nickname}
                        <Typography color="text.secondary">{user?.email}</Typography>
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Tabs centered value={value} onChange={(_, value) => setValue(value)}>
                    <Tab label="Watching" value={0} />
                    <Tab label="Providers" value={1} />
                    <Tab label="Settings" value={2} />
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
