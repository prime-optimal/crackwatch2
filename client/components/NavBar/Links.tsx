import DangerousIcon from "@mui/icons-material/Dangerous";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GamepadIcon from "@mui/icons-material/Gamepad";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {
    Box,
    Collapse,
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
import { useRouter } from "next/router";
import { useState } from "react";

import ResponsiveImage from "@components/ResponsiveImage";

import useBreakpoint from "@hooks/useBreakpoint";

const logo =
    "https://user-images.githubusercontent.com/56039679/156577740-44a1a812-4d7e-4002-8dc5-59ad8ede7d3d.svg";

interface Link {
    name: string;
    href: string;
    icon: any;
    nested?: Link[] | null;
}

const links: Link[] = [
    {
        name: "Home",
        href: "/",
        icon: <HomeIcon />,
        nested: null,
    },
    {
        name: "Recently",
        href: "/recently",
        icon: <TimelapseIcon />,
        nested: null,
    },
    {
        name: "Denuvo",
        href: "/denuvo",
        icon: <DangerousIcon />,
        nested: [
            {
                name: "Games",
                href: "/denuvo/games",
                icon: <GamepadIcon />,
            },
            {
                name: "Updates",
                href: "/denuvo/updates",
                icon: <UpgradeIcon />,
            },
        ],
    },
];

const LinkListItem = ({ href, icon, name, nested }: Link) => {
    const { route } = useRouter();

    const [open, setOpen] = useState(false);

    const toggle = () => {
        nested && setOpen(x => !x);
    };

    if (!nested) {
        return (
            <NextLink href={href} passHref>
                <ListItemButton selected={href === route} LinkComponent="a" onClick={toggle}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            </NextLink>
        );
    }

    return (
        <>
            <ListItemButton onClick={toggle}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                    {nested.map(({ href, icon, name }) => (
                        <NextLink href={href} passHref key={href}>
                            <ListItemButton
                                selected={href === route}
                                LinkComponent="a"
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </NextLink>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default function Links() {
    const mobile = useBreakpoint("md");

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <IconButton onClick={() => setOpen(x => !x)}>
                <MenuIcon />
            </IconButton>

            {!mobile && (
                <Box width={25} height={25} ml={1}>
                    <ResponsiveImage variant="cors" src={logo} />
                </Box>
            )}

            <Drawer anchor="left" open={open} onClose={onClose}>
                <Typography align="center" my={1}>
                    CrackWatch 2
                </Typography>

                <Divider />

                <List sx={{ width: mobile ? "60vw" : 250 }}>
                    {links.map(link => (
                        <LinkListItem {...link} key={link.href} />
                    ))}
                    <Divider sx={{ my: 1 }} />

                    <ListItem disableGutters disablePadding>
                        <NextLink href="https://github.com/Trunkelis/crackwatch2" passHref>
                            <ListItemButton LinkComponent="a">
                                <ListItemIcon>
                                    <GitHubIcon />
                                </ListItemIcon>
                                <ListItemText primary="Github" />
                            </ListItemButton>
                        </NextLink>
                    </ListItem>
                </List>
            </Drawer>
        </Stack>
    );
}
