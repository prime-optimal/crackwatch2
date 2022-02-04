import { AppBar, Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import SidePanel from "./SidePanel";

const Search = dynamic(() => import("./Search"));

export function NavBar() {
    return (
        <AppBar position="relative">
            <Container maxWidth="lg">
                <Stack p={1} flexDirection="row" alignItems="center">
                    <SidePanel />

                    <Typography ml={0.5} variant="button" component="div">
                        Crackwatch 2
                    </Typography>
                    <Box flex={1} />

                    <Search />
                </Stack>
            </Container>
        </AppBar>
    );
}
