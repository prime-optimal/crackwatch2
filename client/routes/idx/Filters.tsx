import { Box, Paper, Typography } from "@mui/material";

export default function Filters() {
    return (
        <Box component={Paper} position="sticky" top={theme => theme.spacing(2)}>
            <Typography>Filters</Typography>
        </Box>
    );
}
