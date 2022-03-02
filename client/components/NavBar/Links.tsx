import HomeIcon from "@mui/icons-material/Home";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";
import NextLink from "next/link";

import useBreakpoint from "@hooks/useBreakpoint";

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
];

export default function Links() {
    return (
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <Typography mr={2}>CW 2</Typography>

            {links.map(({ href, icon, name }) => (
                <NextLink href={href} passHref key={href}>
                    <Button startIcon={icon} LinkComponent="a">
                        {name}
                    </Button>
                </NextLink>
            ))}
        </Stack>
    );
}
