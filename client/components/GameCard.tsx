import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    CircularProgressProps,
    Stack,
    Typography,
} from "@mui/material";
import { memo, useState } from "react";

import { ResponsiveImage } from "@components";

interface GameCardProps {
    img: string;
    name: string;
    video?: string;
    genres?: string[];
    metacritic?: number;
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
    ({ img, name, video, genres = [], metacritic }: GameCardProps) => {
        const [hovering, setHovering] = useState(false);
        const [loading, setLoading] = useState(true);

        return (
            <Card
                sx={{
                    transition: "all 0.2s ease-out",
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
                        <Typography variant="h5">{name}</Typography>
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
    }
);
