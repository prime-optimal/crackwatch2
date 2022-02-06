import { Typography } from "@mui/material";

export function Footer() {
    return (
        <Typography component="footer" color="text.secondary" align="center" mx={2} my={4}>
            Credits: All of the information about the games and everything is provided by
            RAWG.io (https://rawg.io/apidocs)
            <br />
            Disclaimer: this site does not provide download links for games as it is illegal,
            if you like the games then support the developers and buy them.
            <br />
            All trademarks are property of their respective owners in the US and other
            countries.
        </Typography>
    );
}
