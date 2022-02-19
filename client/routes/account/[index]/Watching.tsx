import { Grid, Stack } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

import GameCard from "@components/GameCard";

import useUser from "@hooks/useUser";

interface GameProps {
    slug: string;
}

const Game = ({ slug }: GameProps) => {
    const { data: game } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    return (
        <GameCard
            img={game?.background_image || game?.background_image_additional || ""}
            name={game?.name || game?.alternative_names[0]}
            slug={slug}
            genres={game?.genres.map(x => x.name)}
            video={game?.clip?.clip}
            variant="outlined"
        />
    );
};

function Watching() {
    const { data: user } = useUser();

    return (
        <Stack>
            <Grid container spacing={4}>
                {user?.watching.map(({ slug }) => (
                    <Grid item xs={12} md={6} lg={4} key={slug}>
                        <Game slug={slug} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default memo(Watching, dequal);
