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

    const imageHidden = !!(hovering && video);

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

            <video
                hidden={!imageHidden}
                muted
                preload="none"
                src={video}
                autoPlay
                loop
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            <ResponsiveImage
                props={{
                    sx: {
                        opacity: !imageHidden ? 1 : 0,
                        transition: ({ transitions }) =>
                            `all 0.2s ${transitions.easing.sharp}`,
                    },
                }}
                src={img}
            />
        </CardMedia>
    );
}
