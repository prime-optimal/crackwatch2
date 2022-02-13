import CodeIcon from "@mui/icons-material/Code";
import PublishIcon from "@mui/icons-material/Publish";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WebIcon from "@mui/icons-material/Web";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWR from "swr";

import { AxiosGame } from "@types";

const stringMargin = 450;

export default function Description() {
    const { slug = null } = useRouter().query;
    const pageHref = `/game/${slug}`;

    const { data } = useSWR<AxiosGame>(slug && pageHref);

    const steamUrl = useMemo(() => {
        const url = data?.stores.find(({ store }) => store.slug === "steam")?.url;
        return url || pageHref;
    }, [data?.stores, pageHref]);

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

            <Typography mb={4}>
                <Typography component="span" color="text.secondary">
                    Description:{" "}
                </Typography>
                {formatText()}
            </Typography>

            <Stack flexDirection="row">
                <Link href={steamUrl} passHref>
                    <Button LinkComponent="a" startIcon={<ShoppingCartIcon />}>
                        {steamUrl === pageHref ? "No steam page" : "Steam"}
                    </Button>
                </Link>

                <Link href={data?.website || pageHref} passHref>
                    <Button sx={{ ml: 1 }} LinkComponent="a" startIcon={<WebIcon />}>
                        {data?.website ? "Website" : "No website"}
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
}
