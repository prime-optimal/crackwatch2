import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import WebIcon from "@mui/icons-material/Web";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

import { useGame } from "./hooks";

const stringMargin = 450;

export default function Description() {
    const { data } = useGame();

    const formatText = () => {
        const len = data?.description_raw.length;
        if (!len) return "Not yet";

        if (len > stringMargin) {
            return data.description_raw.slice(0, stringMargin) + " ...";
        }
        return data.description_raw;
    };

    return (
        <Box component={Paper} p={2}>
            <Typography variant="h3" mb={2}>
                {data?.name}
            </Typography>

            <Stack flexDirection="row" flexWrap="wrap" alignItems="center" mb={2}>
                <Typography mr={0.5} color="text.secondary">
                    By:{" "}
                </Typography>
                {data?.developers.map(({ name }) => (
                    <Chip icon={<CodeIcon />} label={name} key={name} sx={{ m: 0.5 }} />
                ))}
                {data?.publishers.map(({ name }) => (
                    <Chip icon={<PublishIcon />} label={name} key={name} sx={{ m: 0.5 }} />
                ))}
            </Stack>

            <Stack mb={2} flexDirection="row" flexWrap="wrap" alignItems="center">
                <Typography mr={0.5} color="text.secondary">
                    Genres:{" "}
                </Typography>
                {data?.genres.map(({ name }) => (
                    <Chip label={name} key={name} sx={{ m: 0.5 }} />
                ))}
            </Stack>

            <Typography mb={2}>
                <Typography component="span" color="text.secondary">
                    Released:{" "}
                </Typography>
                {data?.released || "Not yet"}
            </Typography>

            <Typography mb={4}>
                <Typography component="span" color="text.secondary">
                    Description:{" "}
                </Typography>
                {formatText()}
            </Typography>

            <Stack flexDirection="row">
                {data?.website && (
                    <Button
                        href={data.website}
                        target="_blank"
                        LinkComponent="a"
                        startIcon={<WebIcon />}
                    >
                        Website
                    </Button>
                )}
            </Stack>
        </Box>
    );
}
