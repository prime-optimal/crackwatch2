import { Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Typography
            variant="caption"
            component="footer"
            color="text.secondary"
            align="center"
            mx={2}
            my={4}
        >
            Credits: All of the information about the games and everything is provided by
            RAWG.io{" "}
            <Link href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">
                (https://rawg.io/apidocs)
            </Link>
            <br />
            Disclaimer: this site does not provide download links for games as it is illegal,
            if you like the games then support the developers and buy them.
            <br />
            All trademarks are property of their respective owners in the US and other
            countries.
        </Typography>
    );
}
