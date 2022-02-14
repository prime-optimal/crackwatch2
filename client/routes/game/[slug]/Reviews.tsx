import StarHalfIcon from "@mui/icons-material/StarHalf";
import {
    Box,
    CircularProgress,
    CircularProgressProps,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import IconTypography from "@components/IconTypography";

import { useGame } from "./hooks";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {props.value}
                </Typography>
            </Box>
        </Box>
    );
};

export default function Reviews() {
    const { data } = useGame();

    return (
        <Stack component={Paper} p={2}>
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h5" }}
                icon={<StarHalfIcon fontSize="large" />}
            >
                Reviews
            </IconTypography>

            <Stack flexDirection="row" justifyContent="space-between">
                <Box flex={1}>
                    <Typography align="center" variant="h6">
                        Metacritic
                    </Typography>

                    <Stack my={1} justifyContent="center" alignItems="center">
                        <CircularProgressWithLabel value={data?.metacritic || 0} />
                    </Stack>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box flex={1}>
                    <Typography align="center" variant="h6">
                        User
                    </Typography>

                    <Stack my={1} justifyContent="center" alignItems="center">
                        <CircularProgressWithLabel
                            value={Math.round(((data?.rating || 0) / 5) * 100)}
                        />
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
}
