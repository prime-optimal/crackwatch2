import RecommendIcon from "@mui/icons-material/Recommend";
import { Box, Button, Paper, Stack } from "@mui/material";

import IconTypography from "@components/IconTypography";

import { useGame } from "./hooks";

export default function Buy() {
    const { data } = useGame();

    return (
        <Stack component={Paper} p={2} spacing={2}>
            <IconTypography
                props={{ variant: "h5" }}
                icon={<RecommendIcon fontSize="large" />}
            >
                Support the devs!
            </IconTypography>

            <Stack flexDirection="row" flexWrap="wrap">
                {data?.stores.map(({ url, store }) => (
                    <Box key={url}>
                        <Button LinkComponent="a" href={url} target="_blank">
                            {store.name}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
