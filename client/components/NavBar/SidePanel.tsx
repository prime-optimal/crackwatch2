import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const pages = [
    {
        url: "/",
        title: "Games",
        icon: <SportsEsportsIcon />,
    },
];

export default function SidePanel() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
                <List sx={{ width: 300, mt: 2 }}>
                    {pages.map(({ icon, title, url }) => (
                        <ListItemButton selected={router.pathname === url} key={url}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
