import Progress from "@badrap/bar-of-progress";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import axios from "redaxios";
import { SWRConfig } from "swr";

axios.defaults.baseURL = "/api";

const fetcher = (url: string) => axios.get(url).then(x => x.data);

const theme = createTheme({
    shape: {
        borderRadius: 15,
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#bb86fc",
        },
        secondary: {
            main: "#03dac5",
        },
    },
    typography: {
        fontFamily: [
            "Saira",
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
                <SWRConfig value={{ fetcher }}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
