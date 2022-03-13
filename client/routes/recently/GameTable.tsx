import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";

import { AxiosCrackRecently, ItemRecently } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

interface GameTableProps {
    data?: AxiosCrackRecently[];
}

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

export default function GameTable({ data }: GameTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Crack date</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data?.map(games =>
                        games.items.map(props => <GameRow {...props} key={props.img} />)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
