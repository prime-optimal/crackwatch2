import { CircularProgress, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosGames } from "@types";

import { SWRImmutable } from "@config";

import GameCard from "@components/GameCard";

import { useStore } from "./store";

export default function Index() {
    const query = useStore(store => store.state.filters.query);

    const { fallback } = useSWRConfig();

    // this hook doesn't pick up the fallback auto hmm...
    const { data, setSize } = useSWRInfinite<AxiosGames>(
        (index, previous) => {
            if (previous && !previous.next) return null;
            return urlCat("/games", { ...query, page: index + 1 });
        },
        { ...SWRImmutable, fallbackData: [fallback.games] }
    );

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!inView) return;
        setSize(x => x + 1);
    }, [inView, setSize]);

    return (
        <Stack flex={1}>
            <Grid container spacing={3}>
                {data?.map(({ results }) =>
                    results.map(
                        ({ id, name, background_image, clip, genres, slug, released }) => (
                            <Grid item xs={12} md={6} lg={4} xl={3} key={id}>
                                <GameCard
                                    genres={genres.map(x => x.name)}
                                    video={clip?.clip}
                                    img={background_image}
                                    name={name}
                                    slug={slug}
                                    animations
                                    released={released}
                                />
                            </Grid>
                        )
                    )
                )}
            </Grid>

            {!data && (
                <Stack p={3} justifyContent="center" alignItems="center" mt={1}>
                    <CircularProgress />
                </Stack>
            )}

            {data?.[data.length - 1]?.next && (
                <Stack
                    p={3}
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                    ref={data ? ref : undefined}
                >
                    <CircularProgress />
                </Stack>
            )}
        </Stack>
    );
}
