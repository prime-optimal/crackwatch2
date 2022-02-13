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
}

const GameCard = memo(({ img, name, video, genres, slug }: GameCardProps) => {
    const { ref, inView } = useInView({ delay: 150 });
    const { cracked } = useCrack(inView ? name : null);

    const loading = cracked === null;

    return (
        <Card
            ref={ref}
            sx={{
                transition: ({ transitions }) => `all 0.2s ${transitions.easing.sharp}`,
                "&:hover": {
                    transform: "scale(1.05)",
                },
            }}
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
}, dequal);

export default GameCard;
