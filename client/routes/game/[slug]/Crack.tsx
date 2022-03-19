import ClearIcon from "@mui/icons-material/Clear";
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
import urlCat from "urlcat";

import IconTypography from "@components/IconTypography";

import useWatchingMutation from "@hooks/mutations/useWatchingMutation";
import useCrack from "@hooks/useCrack";
import useIsReleased from "@hooks/useIsReleased";
import useLoggedIn from "@hooks/useLoggedIn";
import useNotistack from "@hooks/useNotistack";

import { useGame } from "./hooks";

interface ProviderInfoProps {
    open: boolean;
    onClose: () => any;
    data: any;
}

const ProviderInfo = ({ onClose, open, data }: ProviderInfoProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Provider results</DialogTitle>
            <DialogContent>
                <Typography sx={{ whiteSpace: "pre-wrap" }} component="pre">
                    {JSON.stringify(data, null, 2)}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

const WatchingIcon = () => {
    const { data } = useGame();
    const loggedIn = useLoggedIn();

    const { addWatching, removeWatching, watching } = useWatchingMutation();

    const snack = useNotistack();

    const active = useMemo(() => {
        return !!watching?.find(game => game.slug === data?.slug);
    }, [data?.slug, watching]);

    const onClick = () => {
        if (!data) return;

        if (active) {
            removeWatching(data.slug);
            snack.normal(`No longer watching ${data.name}`);
            return;
        }

        addWatching(data.name, data.slug);
        snack.normal(`Watching ${data.name}`);
    };

    return (
        <Tooltip title={`Get${active ? "ting" : ""} crack updates`}>
            <span>
                <IconButton disabled={!loggedIn} onClick={onClick}>
                    {active ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
                </IconButton>
            </span>
        </Tooltip>
    );
};

interface SubmitIncorrectProps {
    title: string;
}

const SubmitIncorrect = ({ title }: SubmitIncorrectProps) => {
    const link = useMemo(
        () =>
            urlCat("https://github.com", "/Trunkelis/crackwatch2/issues/new", {
                title,
            }),
        [title]
    );

    return (
        <Tooltip title="Incorrect status?" placement="right">
            <IconButton LinkComponent="a" href={link} target="_blank">
                <ClearIcon />
            </IconButton>
        </Tooltip>
    );
};

export default function Crack() {
    const { data } = useGame();

    const isReleased = useIsReleased(data?.released);

    const {
        cracked,
        providers,
        data: crack,
        error,
        loading,
    } = useCrack(data?.name && isReleased ? data.name : null);

    const [open, setOpen] = useState(false);

    return (
        <Box component={Paper} p={2}>
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <IconTypography props={{ variant: "h5" }} icon={<InfoIcon fontSize="large" />}>
                    Crack info
                </IconTypography>

                {!cracked && !loading && <WatchingIcon />}
            </Stack>

            <Stack flexDirection="row" alignItems="center" mt={1} flexWrap="wrap">
                <Typography component="pre" color="text.secondary">
                    Crack status:{" "}
                </Typography>
                <Typography
                    component="span"
                    color={cracked ? "success.main" : "warning.main"}
                    mr={0.5}
                >
                    {cracked ? "Cracked" : "Not cracked"}
                </Typography>

                <SubmitIncorrect title={data?.name || "Unknown game"} />
            </Stack>

            <Typography>
                <Typography component="span" color="text.secondary">
                    Group:{" "}
                </Typography>
                <Typography color="secondary.main" component="span">
                    {crack?.result.group || "Unknown"}
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
