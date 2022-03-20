import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import useSWRInfinite from "swr/infinite";
import urlCat from "urlcat";

import { AxiosCrackRecently, ItemRecently } from "@types";

import { SWRImmutable } from "@config";

import ResponsiveImage from "@components/ResponsiveImage";

const GameRow = memo(({ date, img, status, title }: ItemRecently) => {
    return (
        <TableRow>
            <TableCell sx={{ height: 100, width: 200, minWidth: 150 }}>
                <ResponsiveImage
                    src={img}
                    variant="cors"
                    props={{
                        borderRadius: ({ shape }) => `${shape.borderRadius}px`,
                    }}
                />
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{date}</TableCell>
        </TableRow>
    );
}, dequal);

export default function GameTable() {
    const { data, setSize, error } = useSWRInfinite<AxiosCrackRecently>((index, prev) => {
        if (prev && !prev.next) return null;
        return urlCat("/crack/recently", { page: index + 1 });
    }, SWRImmutable);

    const loading = !error && !data;

    return (
        <Stack component={Paper} p={1} justifyContent="center" alignItems="center">
            <TableContainer>
                <Table>
                    <TableHead sx={{ position: "relative" }}>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Crack date</TableCell>
                        </TableRow>
                        {loading && (
                            <LinearProgress
                                variant="indeterminate"
                                sx={{ position: "absolute", width: "100%", bottom: 0 }}
                            />
                        )}
                    </TableHead>

                    <TableBody>
                        {data?.map(games =>
                            games.items.map(props => <GameRow {...props} key={props.img} />)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box my={3} mb={1}>
                <Button
                    endIcon={<ExpandMoreIcon />}
                    variant="contained"
                    onClick={() => setSize(size => size + 1)}
                    disabled={loading || !data?.[data.length - 1].next}
                >
                    Load more
                </Button>
            </Box>
        </Stack>
    );
}
