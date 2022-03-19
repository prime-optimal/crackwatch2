import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGameScreenshots } from "@types";

const Carousel = dynamic(() => import("@components/Carousel"), { ssr: false });

export default function Media() {
    const { slug = null } = useRouter().query;
    const { data } = useSWR<AxiosGameScreenshots>(slug && `/game/${slug}/screenshots`);

    // 16 : 9 aspect ratio images
    return (
        <Box width="100%" position="relative" pt="56.25%">
            <Box position="absolute" top={0} left={0} width="100%" height="100%">
                <Carousel
                    images={data?.results.map(screenshot => screenshot.image)}
                    autoRotate={6000}
                />
            </Box>
        </Box>
    );
}
