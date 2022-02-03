import { Box, BoxProps } from "@mantine/core";
import Image from "next/image";

interface ResponsiveImageProps {
    src: string;
    sx?: BoxProps<any>["sx"];
}

export function ResponsiveImage({ src, sx = {} }: ResponsiveImageProps) {
    return (
        <Box
            sx={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                ...sx,
            }}
        >
            <Image src={src} layout="fill" objectFit="cover" />
        </Box>
    );
}
