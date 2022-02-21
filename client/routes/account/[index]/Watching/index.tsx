import ClearIcon from "@mui/icons-material/Clear";
import {
    Avatar,
    Box,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ChangeEvent, memo, useMemo } from "react";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

import useCrack from "@hooks/useCrack";

import useWatchingMutation from "./useWatchingMutation";

interface GameItemProps {
    slug: string;
    started: string;
}

const GameItem = ({ slug, started }: GameItemProps) => {
    const { data: game } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    const { cracked } = useCrack(game?.name || null);
    const { deleteWatching } = useWatchingMutation();

    const days = useMemo(() => {
        const ms = new Date().getTime() - new Date(started).getTime();
        return Math.round(ms / (1000 * 60 * 60 * 24));
    }, [started]);

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();
        deleteWatching(slug);
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

const Notifications = () => {
    const { watching, toggleNotifications } = useWatchingMutation();

    const onChange = (e: ChangeEvent<HTMLInputElement>, willChecked: boolean) => {
        toggleNotifications(willChecked);
    };

    return (
        <Box>
            <FormControlLabel
                labelPlacement="start"
                label="Notifications"
                control={<Switch checked={watching?.notifications} onChange={onChange} />}
            />
        </Box>
    );
};

function Watching() {
    const { watching } = useWatchingMutation();

    return (
        <Stack>
            <Notifications />

            <List>
                {watching?.items.map(({ started, slug }) => (
                    <GameItem key={slug} started={started} slug={slug} />
                ))}
            </List>
        </Stack>
    );
}

export default memo(Watching);
