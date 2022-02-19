import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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

import ResponsiveImage from "@components/ResponsiveImage";

import useUser from "@hooks/useUser";

const UserMenu = (props: MenuProps) => {
    const { data: user, mutate, isValidating } = useUser();

    const onLogout = async () => {
        await mutate(async () => {
            await axios.post("/auth/logout");
            return {};
        });

        Router.push("/auth/login");
    };

    const onLogin = () => Router.push("/auth/login");
    const onAccount = () => Router.push("/account");

    return (
        <Menu
            {...props}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Typography align="center">{user?.nickname || "Logged out"}</Typography>
            <Divider sx={{ my: 1 }} />

            <MenuItem disabled={!user?.nickname} onClick={onAccount}>
                <ListItemIcon>
                    <ManageAccountsIcon />
                </ListItemIcon>
                Account
            </MenuItem>

            {user?.nickname ? (
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            ) : (
                <MenuItem onClick={onLogin} disabled={isValidating}>
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
