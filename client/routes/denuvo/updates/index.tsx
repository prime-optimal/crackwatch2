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
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosDenuvoUpdates } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

export default function DenuvoUpdates() {
    const { data, isValidating, setSize } = useSWRInfinite<AxiosDenuvoUpdates>(
        (index, prev) => {
            if (prev && !prev.next) return null;
            return urlCat("/denuvo/updates", { page: index + 1 });
        }
    );

    const mobile = useBreakpoint("md");

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
                        items.map(({ date, img, price, status, steam }) => (
                            <Grid item xs={6} md={4} lg={3} key={steam}>
                                <Card>
                                    <CardActionArea
                                        LinkComponent="a"
                                        href={steam}
                                        target="_blank"
                                    >
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
                                                        borderTopLeftRadius: ({ shape }) =>
                                                            `${shape.borderRadius}px`,
                                                        opacity: 0.85,
                                                    }}
                                                >
                                                    <Typography align="center">
                                                        {price}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>

                <Box>
                    <Button
                        disabled={isValidating}
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
