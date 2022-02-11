import { Card } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import { useInView } from "react-intersection-observer";

import { useCrack } from "@hooks";

import Content from "./Content";
import Media from "./Media";

interface GameCardProps {
    img: string | null;
    name: string;
    video?: string;
    genres?: string[];
    metacritic?: number;
    slug: string;
}

export const GameCard = memo(
    ({ img, name, video, genres, metacritic, slug }: GameCardProps) => {
        const { ref, inView } = useInView({ delay: 150 });
        const { status } = useCrack(inView ? name : null);

        const loading = status.result === undefined;

        return (
            <Card
                ref={ref}
                sx={{
                    transition: ({ transitions }) => `all 0.2s ${transitions.easing.sharp}`,
                    transform: !inView ? "scale(0.8)" : "scale(1)",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                }}
            >
                <Media img={img} loading={loading} video={video} />
                <Content
                    loading={loading}
                    name={name}
                    cracked={!!status.result}
                    slug={slug}
                    genres={genres}
                    metacritic={metacritic}
                />
            </Card>
        );
    },
    dequal
);
