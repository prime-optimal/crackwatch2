import { Box, BoxProps } from "@mui/material";
import Image from "next/image";

interface ResponsiveImageProps {
    src: string | null;
    props?: BoxProps;
}

export function ResponsiveImage({ src, props = {} }: ResponsiveImageProps) {
    return (
        <Box overflow="hidden" position="relative" width="100%" height="100%" {...props}>
            {src && <Image src={src} alt="Not found" layout="fill" objectFit="cover" />}
        </Box>
    );
}
