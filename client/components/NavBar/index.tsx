import { AppBar, Box, Button, Container, Stack, Typography } from "@mui/material";

export function NavBar() {
    return (
        <AppBar position="relative">
            <Container maxWidth="lg">
                <Stack p={1} flexDirection="row" alignItems="center">
                    <Typography variant="button" component="div">
                        Crackwatch 2
                    </Typography>
                    <Box flex={1} />

                    <Button>Anticipated</Button>
                </Stack>
            </Container>
        </AppBar>
    );
}
