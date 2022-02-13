import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import ResponsiveImage from "@components/ResponsiveImage";

import useInterval from "@hooks/useInterval";

interface CarouselProps {
    images?: string[];
    autoRotate?: number;
}

export default function Carousel({ images = [], autoRotate }: CarouselProps) {
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

    useInterval(() => {
        autoRotate && swipeRight();
    }, autoRotate);

    const swipeProps = useSwipeable({
        onSwipedRight: swipeLeft,
        onSwipedLeft: swipeRight,
    });

    return (
        <Box
            position="relative"
            width="100%"
            height="100%"
            overflow="hidden"
            sx={{
                borderRadius: ({ shape }) => `${shape.borderRadius}px`,
            }}
            {...swipeProps}
        >
            <Box position="absolute" height="100%" width="100%">
                <Stack
                    mx={1}
                    justifyContent="space-between"
                    flexDirection="row"
                    alignItems="center"
                    height="100%"
                >
                    <IconButton onClick={swipeLeft} sx={{ zIndex: 1 }}>
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={swipeRight} sx={{ zIndex: 1 }}>
                        <ChevronRightIcon fontSize="large" />
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
