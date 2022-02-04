import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";

interface IconTypographyProps {
    icon: ReactElement;
    children: ReactNode;
    props?: TypographyProps;
    sx?: StackProps["sx"];
}

export function IconTypography({ icon, children, props = {}, sx = {} }: IconTypographyProps) {
    return (
        <Stack sx={sx} flexDirection="row" flexWrap="wrap" alignItems="center">
            {icon}
            <Typography {...props}>{children}</Typography>
        </Stack>
    );
}
