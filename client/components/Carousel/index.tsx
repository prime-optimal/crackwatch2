import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

import { ResponsiveImage } from "@components";

import clamp from "@utils/clamp";

interface CarouselProps {
    images?: string[];
}

export function Carousel({ images = [] }: CarouselProps) {
    const [active, setActive] = useState(Math.floor(images.length / 2));

    const swipeRight = () => {
        setActive(x => clamp(x + 1, 0, images.length - 1));
    };

    const swipeLeft = () => {
        setActive(x => clamp(x - 1, 0, images.length - 1));
    };

    return (
        <Box
            position="relative"
            width="100%"
            height="100%"
            overflow="hidden"
            sx={{
                borderRadius: ({ shape }) => `${shape.borderRadius}px`,
            }}
        >
            <Box position="absolute" zIndex={1} height="100%" width="100%">
                <Stack
                    mx={1}
                    justifyContent="space-between"
                    flexDirection="row"
                    alignItems="center"
                    height="100%"
                >
                    <IconButton onClick={swipeLeft}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton onClick={swipeRight}>
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            </Box>

            {images.map((image, index) => (
                <Box
                    sx={{
                        borderRadius: ({ shape }) => `${shape.borderRadius}px`,
                    }}
                    position="absolute"
                    width="100%"
                    height="100%"
                    overflow="hidden"
                    component={motion.div}
                    key={image + index}
                    animate={{
                        scale: active === index ? 1 : 0.3,
                        x: `${(index - active) * 100}%`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    <ResponsiveImage src={image} />
                </Box>
            ))}
        </Box>
    );
}
