import { Card } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import { useInView } from "react-intersection-observer";

import useCrack from "@hooks/useCrack";

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
}

const GameCard = memo(
    ({ img, name, video, genres, slug, variant = "elevation", animations }: GameCardProps) => {
        const { ref, inView } = useInView({ delay: 150 });

        const { cracked, loading } = useCrack(inView ? name : null);

        return (
            <Card
                variant={variant}
                ref={ref}
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
