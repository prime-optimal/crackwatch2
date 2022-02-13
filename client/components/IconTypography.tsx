import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";

interface IconTypographyProps {
    icon: ReactElement;
    children: ReactNode;
    props?: TypographyProps;
    sx?: StackProps["sx"];
}

export default function IconTypography({
    icon,
    children,
    props = {},
    sx = {},
}: IconTypographyProps) {
    return (
        <Stack sx={sx} flexDirection="row" flexWrap="wrap" alignItems="center">
            {icon}
            <Typography ml={0.5} {...props}>
                {children}
            </Typography>
        </Stack>
    );
}
