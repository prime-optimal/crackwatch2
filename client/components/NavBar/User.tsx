import { Avatar, Box, Stack, Typography } from "@mui/material";

import { useUser } from "@hooks";

export default function User() {
    const user = useUser();

    return (
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <Box mr={1}>
                <Typography>{user?.nickname ? user.nickname : "Logged out"}</Typography>
            </Box>

            <Avatar
                alt={user?.nickname}
                sx={{ borderRadius: ({ shape }) => `${shape.borderRadius}px` }}
            >
                {user?.nickname[0]}
            </Avatar>
        </Stack>
    );
}
