import { Stack, Typography } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";

import useUser from "@hooks/useUser";

function Watching() {
    const { data: user } = useUser();

    return (
        <Stack>
            <Typography variant="h4">Watching</Typography>
            <Typography component="code">{JSON.stringify(user?.watching, null, 2)}</Typography>
        </Stack>
    );
}

export default memo(Watching, dequal);
