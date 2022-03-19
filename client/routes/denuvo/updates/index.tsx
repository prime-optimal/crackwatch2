import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosDenuvoUpdates } from "@types";

import { SWRImmutable } from "@config";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

const Item = memo(({ date, img, price, status, steam }: AxiosDenuvoUpdates["items"][0]) => {
    const mobile = useBreakpoint("md");

    return (
        <Card>
            <CardActionArea LinkComponent="a" href={steam} target="_blank">
                <CardMedia sx={{ height: mobile ? 100 : 150 }}>
                    <ResponsiveImage src={img} />
                </CardMedia>

                <CardContent sx={{ position: "relative" }}>
                    <Typography gutterBottom>{status}</Typography>
                    <Typography color="text.secondary" variant="body2">
                        Updated on {date}
                    </Typography>

                    {price && (
                        <Box
                            bgcolor="secondary.main"
                            position="absolute"
                            right={0}
                            bottom={0}
                            p={0.3}
                            sx={{
                                borderTopLeftRadius: ({ shape }) => `${shape.borderRadius}px`,
                                opacity: 0.85,
                            }}
                        >
                            <Typography align="center">{price}</Typography>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}, dequal);

export default function DenuvoUpdates() {
    const { data, isValidating, setSize } = useSWRInfinite<AxiosDenuvoUpdates>(
        (index, prev) => {
            if (prev && !prev.next) return null;
            return urlCat("/denuvo/updates", { page: index + 1 });
        },
        SWRImmutable
    );

    const onClick = () => {
        setSize(x => x + 1);
    };

    return (
        <Container maxWidth="xl">
            <Typography align="center" variant="h4" my={3}>
                Denuvo updates
            </Typography>

            <Stack spacing={3} alignItems="center">
                <Grid container spacing={3}>
                    {data?.map(({ items }) =>
                        items.map(item => (
                            <Grid item xs={6} md={4} lg={3} key={item.steam}>
                                <Item {...item} />
                            </Grid>
                        ))
                    )}
                </Grid>

                <Box>
                    <Button
                        disabled={isValidating || !data}
                        onClick={onClick}
                        variant="contained"
                        endIcon={<ExpandMoreIcon />}
                    >
                        Load more
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
