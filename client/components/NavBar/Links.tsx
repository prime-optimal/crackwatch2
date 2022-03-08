import DangerousIcon from "@mui/icons-material/Dangerous";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { memo, useCallback, useState } from "react";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

const logo =
    "https://user-images.githubusercontent.com/56039679/156577740-44a1a812-4d7e-4002-8dc5-59ad8ede7d3d.svg";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
}

const links = [
    {
        name: "Home",
        href: "/",
        icon: <HomeIcon />,
    },
    {
        name: "Recently",
        href: "/recently",
        icon: <TimelapseIcon />,
    },
    {
        name: "Denuvo",
        href: "/denuvo",
        icon: <DangerousIcon />,
    },
    {
        name: "Github",
        href: "https://github.com/Trunkelis/crackwatch2",
        icon: <GitHubIcon />,
    },
];

const SideDrawer = memo(({ onClose, open }: DrawerProps) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Typography align="center" my={1}>
                CrackWatch 2
            </Typography>

            <Divider />

            <List sx={{ width: "60vw" }}>
                {links.map(({ href, icon, name }) => (
                    <ListItem key={href} disableGutters disablePadding>
                        <NextLink href={href} passHref>
                            <ListItemButton LinkComponent="a" onClick={onClose}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </NextLink>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
});

export default function Links() {
    const mobile = useBreakpoint("md");

    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
            {!mobile && (
                <Box width={30} height={30} mr={1}>
                    <ResponsiveImage variant="cors" src={logo} />
                </Box>
            )}

            {mobile ? (
                <IconButton onClick={() => setOpen(x => !x)}>
                    <MenuIcon />
                </IconButton>
            ) : (
                <>
                    {links.map(({ href, icon, name }) => (
                        <NextLink href={href} passHref key={href}>
                            <Button startIcon={icon} LinkComponent="a">
                                {name}
                            </Button>
                        </NextLink>
                    ))}
                </>
            )}

            <SideDrawer open={open} onClose={onClose} />
        </Stack>
    );
}
