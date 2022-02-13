import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ResponsiveImage } from "@components";

interface CarouselProps {
    images?: string[];
}

export function Carousel({ images = [] }: CarouselProps) {
    const [active, setActive] = useState(Math.floor(images.length / 2));

    const swipeRight = () => {
        setActive(x => (x + 1) % images.length);
    };

    const swipeLeft = () => {
        if (active - 1 < 0) {
            setActive(images.length - 1);
            return;
        }
        setActive(x => x - 1);
    };

    useEffect(() => {
        setActive(Math.floor(images.length / 2));
    }, [images]);

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
