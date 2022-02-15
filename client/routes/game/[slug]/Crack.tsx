import InfoIcon from "@mui/icons-material/Info";
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
    Typography,
} from "@mui/material";
import { useState } from "react";

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
                <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default function Crack() {
    const { data } = useGame();

    const { data: user } = useUser();
    const { cracked, data: providers } = useCrack(
        data?.name ? { name: data.name, providers: user?.providers } : null
    );

    const [open, setOpen] = useState(false);

    return (
        <Box component={Paper} p={2}>
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h5" }}
                icon={<InfoIcon fontSize="large" />}
            >
                Crack info
            </IconTypography>

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
                {providers?.map(({ provider }) => (
                    <Chip sx={{ m: 0.5 }} label={provider} key={provider} />
                ))}

                <IconButton sx={{ m: 0.5 }} onClick={() => setOpen(true)}>
                    <UnfoldMoreIcon />
                </IconButton>
            </Stack>

            <ProviderInfo data={providers} onClose={() => setOpen(false)} open={open} />
        </Box>
    );
}
