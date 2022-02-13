import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGameScreenshots } from "@types";

import Carousel from "@components/Carousel";

export default function Media() {
    const { slug = null } = useRouter().query;

    const { data } = useSWR<AxiosGameScreenshots>(slug && `/game/${slug}/screenshots`);

    return (
        <Carousel
            images={data?.results.map(screenshot => screenshot.image)}
            autoRotate={8000}
        />
    );
}
