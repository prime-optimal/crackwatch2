import InfoIcon from "@mui/icons-material/Info";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

import IconTypography from "@components/IconTypography";

import useCrack from "@hooks/useCrack";

export default function Crack() {
    const { slug = null } = useRouter().query;
    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);

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
