import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuProps,
    Stack,
    Typography,
} from "@mui/material";
import Router from "next/router";
import { useState } from "react";
import axios from "redaxios";

import { ResponsiveImage } from "@components";

import { useUser } from "@hooks";

import tryToCatch from "@utils/catch";

const UserMenu = (props: MenuProps) => {
    const { data: user, mutate } = useUser();

    const onLogout = async () => {
        const [result, error] = await tryToCatch(() => axios.post("/auth/logout"));
        if (!result) {
            alert(JSON.stringify(error));
        }

        mutate({});
        Router.push("/auth/login");
    };

    const onLogin = () => Router.push("/auth/login");
    const onSettings = () => Router.push("/settings");

    return (
        <Menu
            {...props}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Typography align="center">{user?.nickname || "Logged out"}</Typography>
            <Divider sx={{ my: 1 }} />

            <MenuItem disabled={!user?.nickname} onClick={onSettings}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                Settings
            </MenuItem>

            {user?.nickname ? (
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            ) : (
                <MenuItem onClick={onLogin}>
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    Login
                </MenuItem>
            )}
        </Menu>
    );
};

export default function User() {
    const { data: user } = useUser();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;

    return (
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar alt={user?.nickname}>
                    {user?.avatar && <ResponsiveImage src={user.avatar} />}
                </Avatar>
            </IconButton>

            <UserMenu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
        </Stack>
    );
}
