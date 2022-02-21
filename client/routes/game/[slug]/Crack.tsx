import InfoIcon from "@mui/icons-material/Info";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { merge } from "merge-anything";
import { useMemo, useState } from "react";
import axios from "redaxios";
import urlCat from "urlcat";

import IconTypography from "@components/IconTypography";

import useCrack from "@hooks/useCrack";
import useUser from "@hooks/useUser";

import { useGame } from "./hooks";

interface ProviderInfoProps {
    open: boolean;
    onClose: () => any;
    data: ReturnType<typeof useCrack>["data"];
}

const ProviderInfo = ({ onClose, open, data }: ProviderInfoProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle>Provider results</DialogTitle>
            <DialogContent>
                <Typography component="code">{JSON.stringify(data, null, 2)}</Typography>
            </DialogContent>
        </Dialog>
    );
};

const Notifications = () => {
    const { data } = useGame();
    const { data: user, mutate } = useUser();

    const active = useMemo(() => {
        return !!user?.watching?.items.find(game => game.slug === data?.slug);
    }, [data?.slug, user?.watching]);

    const onClick = () => {
        if (!user?.nickname) return;

        if (active) {
            const items = user.watching.items.filter(game => game.slug !== data?.slug);

            mutate(user => merge(user || {}, { watching: { items } }), false);
            mutate(async user => {
                const { data: watching } = await axios.delete(
                    urlCat("/account/watching", {
                        slug: data?.slug,
                    })
                );

                return merge(user || {}, { watching }) as any;
            }, false);

            return;
        }

        const items = [
            ...user.watching.items,
            { slug: data?.slug, item: data?.name, started: new Date().toUTCString() },
        ];

        mutate(user => merge(user || {}, { watching: { items } }), false);
        mutate(async user => {
            const { data: watching } = await axios.put(`/account/watching`, {
                slug: data?.slug,
                item: data?.name,
            });

            return merge(user || {}, { watching }) as any;
        }, false);
    };

    return (
        <Tooltip title={`Get${active ? "ting" : ""} crack updates`}>
            <IconButton disabled={!user?.nickname} onClick={onClick}>
                {active ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default function Crack() {
    const { data } = useGame();

    const { cracked, providers, data: crack, error, loading } = useCrack(data?.name || null);

    const [open, setOpen] = useState(false);

    return (
        <Box component={Paper} p={2}>
            <Stack
                flexDirection="row"
                mb={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <IconTypography props={{ variant: "h5" }} icon={<InfoIcon fontSize="large" />}>
                    Crack info
                </IconTypography>

                {!cracked && !loading && <Notifications />}
            </Stack>

            <Typography>
                <Typography component="span" color="text.secondary">
                    Crack status:{" "}
                </Typography>
                <Typography
                    component="span"
                    color={({ palette }) =>
                        cracked ? palette.success.main : palette.warning.main
                    }
                >
                    {cracked ? "Cracked" : "Not cracked"}
                </Typography>
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Stack flexDirection="row" flexWrap="wrap" alignItems="center">
                <Typography mr={0.5} color="text.secondary">
                    Providers:
                </Typography>
                {providers?.map(provider => (
                    <Chip sx={{ m: 0.5 }} label={provider} key={provider} />
                ))}

                <IconButton sx={{ m: 0.5 }} onClick={() => setOpen(true)}>
                    <UnfoldMoreIcon />
                </IconButton>
            </Stack>

            <ProviderInfo data={crack || error} onClose={() => setOpen(false)} open={open} />
        </Box>
    );
}
