import Progress from "@badrap/bar-of-progress";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { dequal } from "dequal";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import Script from "next/script";
import axios from "redaxios";
import { SWRConfig } from "swr";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";

axios.defaults.baseURL = "/api";

const fetcher = (url: string) => axios.get(url).then(x => x.data);

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#88c0d0",
        },
        secondary: {
            main: "#5e81ac",
        },
        background: {
            default: "#242933",
            paper: "#2e3440",
        },
        warning: {
            main: "#d08770",
        },
        success: {
            main: "#a3be8c",
        },
        error: {
            main: "#bf616a",
        },
        divider: "#4c566a",
        text: {
            primary: "#eceff4",
            secondary: "#d8dee9",
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: [
            "Rubik",
            "Roboto",
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
    color: "#81a1c1",
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
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="https://user-images.githubusercontent.com/56039679/156577740-44a1a812-4d7e-4002-8dc5-59ad8ede7d3d.svg"
                />
            </Head>

            {/** trying analytics :P */}
            <Script
                data-domain="crackwatch2.com"
                src="https://plausible.io/js/plausible.js"
                strategy="afterInteractive"
            />

            <ThemeProvider theme={theme}>
                <SWRConfig
                    value={{
                        fetcher,
                        compare: dequal,
                        onError: error => {
                            console.log({ error });
                        },
                    }}
                >
                    <CssBaseline />
                    <NavBar />
                    <Component {...pageProps} />
                    <Footer />
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
