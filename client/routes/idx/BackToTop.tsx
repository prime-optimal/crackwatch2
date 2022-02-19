import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Grow, useScrollTrigger } from "@mui/material";

export default function BackToTop() {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 1200,
    });

    const onClick = () => {
        document.querySelector("header")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Grow in={trigger}>
            <Fab
                onClick={onClick}
                sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 1 }}
                size="small"
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Grow>
    );
}
