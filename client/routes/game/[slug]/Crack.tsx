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
import { useMemo, useState } from "react";

import IconTypography from "@components/IconTypography";

import useWatchingMutation from "@hooks/mutations/useWatchingMutation";
import useCrack from "@hooks/useCrack";

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

const WatchingIcon = () => {
    const { data } = useGame();
    const { addWatching, removeWatching, watching } = useWatchingMutation();

    const active = useMemo(() => {
        return !!watching?.find(game => game.slug === data?.slug);
    }, [data?.slug, watching]);

    const onClick = () => {
        if (!data) return;

        if (active) {
            removeWatching(data.slug);
            return;
        }

        addWatching(data.name, data.slug);
    };

    return (
        <Tooltip title={`Get${active ? "ting" : ""} crack updates`}>
            <IconButton disabled={!watching} onClick={onClick}>
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

                {!cracked && !loading && <WatchingIcon />}
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
