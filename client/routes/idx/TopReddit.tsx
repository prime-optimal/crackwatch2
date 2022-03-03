import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import { useMemo } from "react";
import useSWR from "swr/immutable";
import urlCat from "urlcat";

import { AxiosRedditTop } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

const BASE_URL = "https://www.reddit.com";

const url = urlCat(BASE_URL, "/r/crackwatch/top.json", {
    limit: 10,
    t: "day",
});

export default function TopReddit() {
    const { data } = useSWR<AxiosRedditTop>(url);

    const result = useMemo(() => {
        const length = data?.data.children.length || 0;
        return data?.data.children[Math.floor(Math.random() * length)].data;
    }, [data?.data.children]);

    return (
        <Stack>
            <Typography variant="h6" gutterBottom>
                Today in {result?.subreddit_name_prefixed}
            </Typography>
            <Card variant="outlined">
                <CardActionArea
                    LinkComponent="a"
                    href={`${BASE_URL}${result?.permalink}`}
                    target="_blank"
                >
                    {result?.url.includes("i.redd.it") && (
                        <CardMedia sx={{ height: 280 }}>
                            <ResponsiveImage variant="cors" src={result.url} />
                        </CardMedia>
                    )}

                    <CardContent>
                        <Stack>
                            <Chip
                                label={
                                    result?.link_flair_richtext[0].t ||
                                    result?.author_flair_richtext[0].t
                                }
                            />
                            <Typography mt={1}>{result?.title}</Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    );
}
