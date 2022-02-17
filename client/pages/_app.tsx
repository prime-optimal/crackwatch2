import Progress from "@badrap/bar-of-progress";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { dequal } from "dequal";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { SWRConfig } from "swr";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";

axios.defaults.baseURL = "/api";

const fetcher = (url: string) => axios.get(url).then(x => x.data);

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: [
            "Inter",
            "-apple-system",
            "system-ui",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
        ].join(","),
    },
});

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

const progress = new Progress({
    size: 3,
    color: "#fff",
    delay: 40,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Crackwatch</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <SWRConfig value={{ fetcher, compare: dequal }}>
                    <CssBaseline />
                    <NavBar />
                    <Component {...pageProps} />
                    <Footer />
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
