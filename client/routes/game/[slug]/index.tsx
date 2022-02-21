import { Container, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { AxiosGame } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import Buy from "./Buy";
import Crack from "./Crack";
import Description from "./Description";
import Media from "./Media";
import Reviews from "./Reviews";

export default function Game() {
    const { slug = null } = useRouter().query;
    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    const title = data?.name + " Crack status";

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:type" content="object" />
                <meta property="og:image" content={data?.background_image_additional} />
                <meta property="og:description" content={data?.description_raw} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <ResponsiveImage
                src={data?.background_image}
                image={{ priority: true } as any}
                props={{
                    sx: {
                        filter: "blur(10px)",
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 95%)",
                    },
                    zIndex: -1,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                }}
            />

            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Media />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Description />
                </Grid>

                <Grid item xs={12} md={3} lg={4}>
                    <Buy />
                </Grid>

                <Grid item xs={12} md={3} lg={4}>
                    <Crack />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Reviews />
                </Grid>
            </Grid>
        </Container>
    );
}
