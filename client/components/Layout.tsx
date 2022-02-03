import { Box, Navbar, Paper, Text } from "@mantine/core";

interface LayoutProps {
    children: any;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Box>
            <Paper shadow="xs">
                <Navbar height={50} padding="xs">
                    <Text>Navbar</Text>
                </Navbar>
            </Paper>
            {children}
        </Box>
    );
}
