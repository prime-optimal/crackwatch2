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
import { dequal } from "dequal";
import NextLink from "next/link";
import { memo, useMemo } from "react";
import axios from "redaxios";
import useSWR from "swr/immutable";
import urlCat from "urlcat";

import { AxiosGame } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useCrack from "@hooks/useCrack";
import useUser from "@hooks/useUser";

interface GameItemProps {
    slug: string;
    started: string;
}

const GameItem = ({ slug, started }: GameItemProps) => {
    const { data: game } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    const { cracked } = useCrack(game?.name || null);
    const { mutate, isValidating } = useUser();

    const days = useMemo(() => {
        const ms = new Date().getTime() - new Date(started).getTime();
        return Math.round(ms / (1000 * 60 * 60 * 24));
    }, [started]);

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();

        mutate(user => {
            if (!user?.nickname) return;

            return {
                ...user,
                watching: user.watching.filter(game => game.slug !== slug),
            } as any;
        }, false);

        mutate(async user => {
            if (!user?.nickname) return;

            const { data: watching } = await axios.delete(
                urlCat("/account/watching", {
                    slug,
                })
            );
            return { ...user, watching } as any;
        }, false);
    };

    return (
        <NextLink href={`/game/${slug}`} passHref>
            <ListItem
                disablePadding
                secondaryAction={
                    <IconButton disabled={isValidating} onClick={onDelete as any}>
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
    const { data: user } = useUser();

    return (
        <List>
            {user?.watching.map(({ started, slug }) => (
                <GameItem key={slug} started={started} slug={slug} />
            ))}
        </List>
    );
}

export default memo(Watching, dequal);
