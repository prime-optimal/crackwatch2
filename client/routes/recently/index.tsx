import {
    Box,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import useSWR from "swr/immutable";

import { AxiosCrackRecently } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

export default function Recently() {
    const { data } = useSWR<AxiosCrackRecently[]>("/crack/recently");

    const mobile = useBreakpoint("sm");

    return (
        <Container maxWidth="xl">
            <Typography mt={3} align="center" gutterBottom variant="h3">
                Recently cracked
            </Typography>
            <Box component={Paper} p={1}>
                <List>
                    {data?.map(({ date, img, status, title }) => (
                        <ListItem key={title + img}>
                            <ListItemAvatar>
                                <Box
                                    height={100}
                                    overflow="hidden"
                                    width={mobile ? 100 : 300}
                                    borderRadius={({ shape }) => `${shape.borderRadius}px`}
                                >
                                    <ResponsiveImage src={img} />
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
                    ))}
                </List>
            </Box>
        </Container>
    );
}
