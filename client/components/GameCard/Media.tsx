import { CardMedia, LinearProgress } from "@mui/material";
import { useState } from "react";

import ResponsiveImage from "@components/ResponsiveImage";

interface MediaProps {
    img: string | null;
    video?: string;
    loading: boolean;
}

export default function Media({ img, video, loading }: MediaProps) {
    const [hovering, setHovering] = useState(false);

    return (
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
            {loading && (
                <LinearProgress
                    sx={{ position: "absolute", top: 0, width: "100%", zIndex: 1 }}
                />
            )}

            {hovering && video ? (
                <video
                    muted
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
    );
}
