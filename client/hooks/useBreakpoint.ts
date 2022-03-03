import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoint(point: Breakpoint = "sm") {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(point));
}
