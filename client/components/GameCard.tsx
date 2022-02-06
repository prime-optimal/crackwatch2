import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    CircularProgressProps,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";
import { dequal } from "dequal";
import NextLink from "next/link";
import { memo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ResponsiveImage } from "@components";

interface GameCardProps {
    img: string;
    name: string;
    video?: string;
    genres?: string[];
    metacritic?: number;
    slug: string;
}

const Loading = () => {
    return (
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Stack>
    );
};

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
                    {Math.round(props.value)}
                </Typography>
            </Box>
        </Box>
    );
};

export const GameCard = memo(
    ({ img, name, video, genres = [], metacritic, slug }: GameCardProps) => {
        const [hovering, setHovering] = useState(false);
        const [loading, setLoading] = useState(true);

        const { ref, inView } = useInView({ delay: 150 });

        return (
            <Card
                ref={ref}
                sx={{
                    transition: "all 0.2s ease-out",
                    transform: !inView ? "scale(0.8)" : "scale(1)",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                }}
            >
                <CardMedia
                    sx={{ height: 250 }}
                    onMouseEnter={() => setHovering(true)}
                    onClick={() => setHovering(x => !x)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {hovering && video ? (
                        <>
                            {loading && <Loading />}
                            <video
                                onLoadedData={() => setLoading(false)}
                                muted
                                preload="auto"
                                src={video}
                                autoPlay
                                loop
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </>
                    ) : (
                        <ResponsiveImage src={img} />
                    )}
                </CardMedia>
                <CardContent>
                    <Stack
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                    >
                        <NextLink href={`/game/${slug}`} passHref>
                            <Typography
                                variant="h5"
                                component={MuiLink}
                                underline="none"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "text.secondary",
                                    },
                                }}
                            >
                                {name}
                            </Typography>
                        </NextLink>
                        {metacritic && (
                            <CircularProgressWithLabel
                                variant="determinate"
                                value={metacritic}
                                color="success"
                                size={30}
                            />
                        )}
                    </Stack>

                    <Stack flexDirection="row" flexWrap="wrap" mt={1}>
                        {genres.map(genre => (
                            <Chip sx={{ mr: 1, my: 0.5 }} label={genre} key={genre} />
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        );
    },
    dequal
);
