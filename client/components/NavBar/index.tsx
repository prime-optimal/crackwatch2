import { AppBar, Container, Link as MuiLink, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";

import SidePanel from "./SidePanel";
import User from "./User";

const Search = dynamic(() => import("./Search"));

export function NavBar() {
    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Stack
                    p={1}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack flexDirection="row" justifyContent="center" alignItems="center">
                        <SidePanel />
                        <NextLink href="/" passHref>
                            <MuiLink underline="none" color="inherit">
                                CW 2
                            </MuiLink>
                        </NextLink>
                    </Stack>

                    <Search />
                    <User />
                </Stack>
            </Container>
        </AppBar>
    );
}
