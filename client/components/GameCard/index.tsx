import { Card } from "@mui/material";
import { dequal } from "dequal";
import { motion } from "framer-motion";
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
        const { cracked } = useCrack(inView ? name : null);

        const loading = cracked === null;

        return (
            <Card
                ref={ref}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                animate={{
                    scale: inView ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
            >
                <Media img={img} loading={loading} video={video} />
                <Content
                    loading={loading}
                    name={name}
                    cracked={cracked}
                    slug={slug}
                    genres={genres}
                    metacritic={metacritic}
                />
            </Card>
        );
    },
    dequal
);
