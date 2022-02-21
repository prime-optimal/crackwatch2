import { Box, FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent, memo } from "react";

import useSettingsMutation from "@hooks/mutations/useSettingsMutation";
import useLoggedIn from "@hooks/useLoggedIn";

function Settings() {
    const { settings, setNotifications } = useSettingsMutation();
    const loggedIn = useLoggedIn();

    const onChange = (e: ChangeEvent<HTMLInputElement>, willChecked: boolean) => {
        setNotifications(willChecked);
    };

    return (
        <Box>
            <FormControlLabel
                labelPlacement="end"
                label="Get notified by email"
                control={
                    <Switch
                        disabled={!loggedIn}
                        checked={settings?.notifications || false}
                        onChange={onChange}
                    />
                }
            />
        </Box>
    );
}

export default memo(Settings);
