import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import useSWR from "swr/immutable";

import { AxiosCrackDenuvo } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

interface GameTableProps {
    type: number;
}

const GameRow = memo(({ cracked, img, released, title }: AxiosCrackDenuvo) => {
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
            <TableCell>{cracked ? "Cracked" : "Uncracked"}</TableCell>
            <TableCell>{cracked || "No"}</TableCell>
            <TableCell>{released}</TableCell>
        </TableRow>
    );
}, dequal);

export default function GameTable({ type }: GameTableProps) {
    const { data } = useSWR<AxiosCrackDenuvo[]>(`/crack/denuvo?type=${type}`);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Crack date</TableCell>
                        <TableCell>Release date</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data?.map(props => (
                        <GameRow {...props} key={props.img} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
