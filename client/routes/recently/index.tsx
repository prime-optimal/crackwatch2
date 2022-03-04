import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { memo } from "react";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosCrackRecently } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

interface CrackedItemProps {
    mobile: boolean;
    img: string;
    title: string;
    date: string;
    status: string;
}

const CrackedItem = memo(({ date, img, mobile, status, title }: CrackedItemProps) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Box
                    height={100}
                    overflow="hidden"
                    width={mobile ? 100 : 300}
                    borderRadius={({ shape }) => `${shape.borderRadius}px`}
                >
                    <ResponsiveImage src={img} variant="cors" />
                </Box>
            </ListItemAvatar>

            <ListItemText
                sx={{ ml: 2 }}
                primary={<Typography variant="h6">{title}</Typography>}
                secondary={
                    <Typography color="text.secondary">
                        {date}
                        {" - "}
                        {status}
                    </Typography>
                }
            />
        </ListItem>
    );
});

export default function Recently() {
    const { data, setSize, isValidating } = useSWRInfinite<AxiosCrackRecently>(
        (index, prev) => {
            if (prev && !prev.next) return null;
            return urlCat("/crack/recently", { page: index + 1 });
        }
    );

    const mobile = useBreakpoint("sm");

    return (
        <Container maxWidth="xl">
            <Typography mt={3} align="center" gutterBottom variant="h3">
                Recently cracked
            </Typography>
            <Stack component={Paper} p={1} justifyContent="center" alignItems="center">
                <List sx={{ width: "100%" }}>
                    {data?.map(games =>
                        games.items.map(({ date, img, status, title }) => (
                            <CrackedItem
                                key={img}
                                date={date}
                                status={status}
                                title={title}
                                img={img}
                                mobile={mobile}
                            />
                        ))
                    )}
                </List>

                <Box>
                    <Button
                        endIcon={<ExpandMoreIcon />}
                        variant="contained"
                        onClick={() => setSize(size => size + 1)}
                        disabled={isValidating}
                    >
                        Load more
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
