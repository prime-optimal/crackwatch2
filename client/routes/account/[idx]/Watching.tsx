import ClearIcon from "@mui/icons-material/Clear";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { memo, useMemo } from "react";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useWatchingMutation from "@hooks/mutations/useWatchingMutation";
import useCrack from "@hooks/useCrack";

interface GameItemProps {
    slug: string;
    started: string;
}

const GameItem = ({ slug, started }: GameItemProps) => {
    const { data: game } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    const { cracked } = useCrack(game?.name || null);
    const { removeWatching } = useWatchingMutation();

    const days = useMemo(() => {
        const ms = new Date().getTime() - new Date(started).getTime();
        return Math.round(ms / (1000 * 60 * 60 * 24));
    }, [started]);

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();
        removeWatching(slug);
    };

    return (
        <NextLink href={`/game/${slug}`} passHref>
            <ListItem
                disablePadding
                secondaryAction={
                    <IconButton onClick={onDelete as any}>
                        <ClearIcon />
                    </IconButton>
                }
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            sx={{ borderRadius: ({ shape }) => `${shape.borderRadius}px` }}
                        >
                            <ResponsiveImage src={game?.background_image} />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <Typography
                                color={({ palette }) =>
                                    cracked ? palette.success.main : palette.warning.main
                                }
                            >
                                {game?.name}
                            </Typography>
                        }
                        secondary={`${days} days and counting`}
                    />
                </ListItemButton>
            </ListItem>
        </NextLink>
    );
};

function Watching() {
    const { watching } = useWatchingMutation();

    return (
        <List>
            {watching?.map(({ started, slug }) => (
                <GameItem key={slug} started={started} slug={slug} />
            ))}
        </List>
    );
}

export default memo(Watching);
