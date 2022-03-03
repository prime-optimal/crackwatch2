import { Card } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";

import useCrack from "@hooks/useCrack";
import useIsReleased from "@hooks/useIsReleased";

import Content from "./Content";
import Media from "./Media";

interface GameCardProps {
    img: string | null;
    name: string;
    video?: string;
    genres?: string[];
    slug: string;
    variant?: "elevation" | "outlined";
    animations?: true;
    released?: string;
}

const GameCard = memo(
    ({
        img,
        name,
        video,
        genres,
        slug,
        variant = "elevation",
        animations,
        released,
    }: GameCardProps) => {
        const isReleased = useIsReleased(released);

        const { cracked, loading } = useCrack(isReleased ? name : null);

        return (
            <Card
                variant={variant}
                sx={
                    animations && {
                        transition: ({ transitions }) =>
                            `all 0.2s ${transitions.easing.sharp}`,
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }
                }
            >
                <Media img={img} loading={loading} video={video} />
                <Content
                    loading={loading}
                    name={name}
                    cracked={cracked}
                    slug={slug}
                    genres={genres}
                />
            </Card>
        );
    },
    dequal
);

export default GameCard;
