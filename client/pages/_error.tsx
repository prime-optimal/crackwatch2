import { Stack, Typography } from "@mui/material";
import type { ErrorProps } from "next/error";

export default function Error({ statusCode, title }: ErrorProps) {
    return (
        <Stack my={10} mx="40%">
            <Typography variant="h2">{statusCode}</Typography>
            <Typography>{title}</Typography>
        </Stack>
    );
}
