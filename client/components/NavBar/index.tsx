import { AppBar, Container, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { memo } from "react";

import Links from "./Links";
import User from "./User";

const Search = dynamic(() => import("./Search"));

function NavBar() {
    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Stack
                    p={1}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Links />

                    <Stack flexDirection="row" flex={1} justifyContent="flex-end">
                        <Search />
                        <User />
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default memo(NavBar);
