import { Box, BoxProps } from "@mui/material";
import { memo } from "react";

interface ResponsiveImageProps {
    src: string | null | undefined;
    props?: BoxProps;
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
    variant?: "normal" | "cors";
}

function ResponsiveImage({
    src,
    props = {},
    objectFit = "cover",
    variant = "normal",
}: ResponsiveImageProps) {
    return (
        <Box overflow="hidden" position="relative" width="100%" height="100%" {...props}>
            {src && (
                <Box
                    component="img"
                    loading="lazy"
                    alt="Probably loading..."
                    crossOrigin={variant === "normal" ? "anonymous" : undefined}
                    referrerPolicy={variant === "normal" ? "no-referrer" : undefined}
                    src={src}
                    sx={{
                        position: "absolute",
                        objectFit,
                        width: "100%",
                        height: "100%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </Box>
    );
}

export default memo(ResponsiveImage);
