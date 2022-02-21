import { Box, BoxProps } from "@mui/material";
import Image, { ImageProps } from "next/image";

interface ResponsiveImageProps {
    src: string | null | undefined;
    props?: BoxProps;
    image?: ImageProps;
}

export default function ResponsiveImage({ src, props = {}, image }: ResponsiveImageProps) {
    return (
        <Box overflow="hidden" position="relative" width="100%" height="100%" {...props}>
            {src && (
                <Image
                    decoding="auto"
                    src={src}
                    alt="Probably Loading..."
                    layout="fill"
                    objectFit="cover"
                    {...image}
                />
            )}
        </Box>
    );
}
