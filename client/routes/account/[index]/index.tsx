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
import { useState } from "react";

import useUser from "@hooks/useUser";

import Providers from "./Providers";
import Watching from "./Watching";

const items = [Watching, Providers].map((Item, index) => ({ Item, index }));

export default function Account() {
    const { data: user } = useUser();

    const [value, setValue] = useState(0);

    if (!user?.nickname) {
        return (
            <Typography align="center" variant="h3" mt={3}>
                Not logged in
            </Typography>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Box component={Paper} p={2}>
                <Stack
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
                    <Typography ml={1} variant="h3">
                        {user.nickname}
                        <Typography color="text.secondary">{user.email}</Typography>
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Tabs
                    variant="fullWidth"
                    centered
                    value={value}
                    onChange={(_, value) => setValue(value)}
                >
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
