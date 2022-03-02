import { AppBar, Container, Stack } from "@mui/material";
import dynamic from "next/dynamic";

import Links from "./Links";
import User from "./User";

const Search = dynamic(() => import("./Search"));

export default function NavBar() {
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

                    <Stack flexDirection="row">
                        <Search />
                        <User />
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}
