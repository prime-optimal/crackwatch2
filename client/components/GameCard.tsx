import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpIcon from "@mui/icons-material/Help";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    CircularProgressProps,
    LinearProgress,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";
import { dequal } from "dequal";
import NextLink from "next/link";
import { memo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ResponsiveImage } from "@components";

import { useCrack } from "@hooks";

interface GameCardProps {
    img: string | null;
    name: string;
    video?: string;
    genres?: string[];
    metacritic?: number;
    slug: string;
    preview?: string;
}

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
    ({ img, name, video, genres = [], metacritic, slug, preview }: GameCardProps) => {
        const [hovering, setHovering] = useState(false);
        const [vidLoading, setVidLoading] = useState(true);

        const { ref, inView } = useInView({ delay: 150 });
        const { status } = useCrack(inView ? name : null);

        return (
            <Card
                ref={ref}
                sx={{
                    transition: ({ transitions }) => `all 0.2s ${transitions.easing.sharp}`,
                    transform: !inView ? "scale(0.8)" : "scale(1)",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                }}
            >
                <CardMedia
                    sx={{
                        height: 250,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    onMouseEnter={() => setHovering(true)}
                    onClick={() => setHovering(x => !x)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {status.result === undefined && (
                        <LinearProgress
                            sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1 }}
                        />
                    )}

                    {hovering && video ? (
                        <video
                            onLoadedData={() => setVidLoading(false)}
                            muted
                            poster={preview}
                            preload="auto"
                            src={video}
                            autoPlay
                            loop
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
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
                        <Stack flexDirection="row" alignItems="center" justifyContent="center">
                            <NextLink href={`/game/${slug}`} passHref>
                                <Typography
                                    variant="h5"
                                    component={MuiLink}
                                    underline="none"
                                    mr={0.5}
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

                            {status.result !== undefined && (
                                <>
                                    {status.result ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <HelpIcon color="warning" />
                                    )}
                                </>
                            )}
                        </Stack>

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
