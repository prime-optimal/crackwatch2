import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import axios from "redaxios";
import { SWRConfig } from "swr";

import { Layout } from "@components";

axios.defaults.baseURL = "/api";

const fetcher = (url: string) => axios.get(url).then(x => x.data);

const theme: MantineProviderProps["theme"] = {
    fontFamily: ["Inter", "sans-serif"].join(", "),
};

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Crackwatch</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                <SWRConfig value={{ fetcher }}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </MantineProvider>
        </>
    );
}
