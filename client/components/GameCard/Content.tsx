import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpIcon from "@mui/icons-material/Help";
import { CardContent, Chip, Link as MuiLink, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

interface ContentProps {
    slug: string;
    name: string;
    cracked: boolean | null;
    genres?: string[];
    loading: boolean;
}

export default function Content({ name, slug, cracked, genres = [], loading }: ContentProps) {
    return (
        <CardContent>
            <Stack
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="center">
                    <NextLink href={`/game/${slug}`} passHref>
                        <Typography
                            variant="h5"
                            component={MuiLink}
                            underline="none"
                            mr={0.5}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                    color: "text.secondary",
                                },
                            }}
                        >
                            {name}
                        </Typography>
                    </NextLink>

                    {!loading && (
                        <>
                            {cracked ? (
                                <CheckCircleIcon color="success" />
                            ) : (
                                <HelpIcon color="warning" />
                            )}
                        </>
                    )}
                </Stack>
            </Stack>

            <Stack flexDirection="row" flexWrap="wrap" mt={1}>
                {genres.map(genre => (
                    <Chip sx={{ mr: 1, my: 0.5 }} label={genre} key={genre} />
                ))}
            </Stack>
        </CardContent>
    );
}
