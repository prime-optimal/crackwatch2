import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import axios from "redaxios";
import useSWR from "swr/immutable";
import urlCat from "urlcat";

import { AxiosRedditTop } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

const BASE_URL = "https://www.reddit.com";

const url = urlCat(BASE_URL, "/r/crackwatch/top.json", {
    limit: 1,
    t: "day",
});

const fetcher = (url: string) =>
    axios
        .get(url, {
            withCredentials: false,
        })
        .then(x => x.data);

export default function TopReddit() {
    const { data } = useSWR<AxiosRedditTop>(url, fetcher);

    const result = data?.data.children[0].data;

    return (
        <Stack>
            <Typography variant="h6" gutterBottom>
                Today in {result?.subreddit_name_prefixed}
            </Typography>
            <Card>
                <CardActionArea
                    LinkComponent="a"
                    href={`${BASE_URL}${result?.permalink}`}
                    target="_blank"
                >
                    <CardHeader
                        title={
                            <Typography>
                                {result?.link_flair_richtext[0].t ||
                                    result?.author_flair_richtext[0].t}
                            </Typography>
                        }
                    />

                    <CardMedia sx={{ height: 250 }}>
                        <ResponsiveImage
                            image={{ objectFit: "contain" } as any}
                            src={result?.url}
                        />
                    </CardMedia>

                    <CardContent>
                        <Typography>{result?.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    );
}
