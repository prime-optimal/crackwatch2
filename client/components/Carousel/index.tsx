import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { Box, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import ResponsiveImage from "@components/ResponsiveImage";

import useInterval from "@hooks/useInterval";
import useOnClickOutside from "@hooks/useOnClickOutside";

interface CarouselProps {
    images?: string[];
    autoRotate?: number;
}

export default function Carousel({ images = [], autoRotate }: CarouselProps) {
    const [active, setActive] = useState(Math.floor(images.length / 2));
    const [fullscreen, setFullscreen] = useState(false);

    const containerRef = useRef<HTMLElement | null>(null);

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

    const onClickOutside = useCallback(() => {
        setFullscreen(false);
    }, []);

    useEffect(() => {
        setActive(Math.floor(images.length / 2));
    }, [images]);

    const { reset } = useInterval(() => {
        autoRotate && swipeRight();
    }, autoRotate);

    useOnClickOutside(containerRef, onClickOutside);

    return (
        <Box
            overflow="hidden"
            sx={{
                borderRadius: ({ shape }) => `${shape.borderRadius}px`,
                position: fullscreen ? "fixed" : "relative",
                width: fullscreen ? "90%" : "100%",
                height: fullscreen ? "90%" : "100%",
                transform: fullscreen ? "translate(-50%, -50%)" : undefined,
                top: fullscreen ? "50%" : undefined,
                left: fullscreen ? "50%" : undefined,
                zIndex: fullscreen ? 1 : "auto",
            }}
            ref={containerRef}
        >
            <Box position="absolute" height="100%" width="100%">
                <Stack
                    mx={1}
                    justifyContent="space-between"
                    flexDirection="row"
                    alignItems="center"
                    height="100%"
                >
                    <Stack height="100%">
                        <Box flex={0.5} pt={1}>
                            <IconButton
                                sx={{ zIndex: 1 }}
                                onClick={() => setFullscreen(x => !x)}
                            >
                                {fullscreen ? (
                                    <FullscreenExitIcon fontSize="large" />
                                ) : (
                                    <FullscreenIcon fontSize="large" />
                                )}
                            </IconButton>
                        </Box>
                        <IconButton
                            onClick={() => {
                                swipeLeft();
                                reset();
                            }}
                            sx={{ zIndex: 1 }}
                        >
                            <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                    <IconButton
                        onClick={() => {
                            swipeRight();
                            reset();
                        }}
                        sx={{ zIndex: 1 }}
                    >
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
                    transition={{ type: "tween" }}
                >
                    <ResponsiveImage src={image} />
                </Box>
            ))}
        </Box>
    );
}
