import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

import { AxiosGame } from "@types";

const stringMargin = 450;

export default function Description() {
    const { slug = null } = useRouter().query;
    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);

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
                {data?.developers.map(dev => (
                    <Chip
                        icon={<CodeIcon />}
                        label={dev.name}
                        key={dev.name}
                        sx={{ m: 0.5 }}
                    />
                ))}
                {data?.publishers.map(publisher => (
                    <Chip
                        icon={<PublishIcon />}
                        label={publisher.name}
                        key={publisher.name}
                        sx={{ m: 0.5 }}
                    />
                ))}
            </Stack>

            <Typography mb={2}>
                <Typography component="span" color="text.secondary">
                    Released:{" "}
                </Typography>
                {data?.released || "Not yet"}
            </Typography>

            <Typography>
                <Typography component="span" color="text.secondary">
                    Description:{" "}
                </Typography>
                {formatText()}
            </Typography>
        </Box>
    );
}
