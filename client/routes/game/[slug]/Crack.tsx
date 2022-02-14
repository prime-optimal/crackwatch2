import InfoIcon from "@mui/icons-material/Info";
import { Box, Paper, Typography } from "@mui/material";

import IconTypography from "@components/IconTypography";

import useCrack from "@hooks/useCrack";

import { useGame } from "./hooks";

export default function Crack() {
    const { data } = useGame();

    const { cracked, data: providers } = useCrack(data?.name || null);

    return (
        <Box component={Paper} p={2}>
            <IconTypography
                sx={{ mb: 2 }}
                props={{ variant: "h5" }}
                icon={<InfoIcon fontSize="large" />}
            >
                Crack info
            </IconTypography>

            <Typography mb={1}>
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

            {/** Providers todo */}
        </Box>
    );
}
