import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpIcon from "@mui/icons-material/Help";
import {
    Box,
    CardContent,
    Chip,
    CircularProgress,
    CircularProgressProps,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";
import NextLink from "next/link";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {Math.round(props.value)}
                </Typography>
            </Box>
        </Box>
    );
};

interface ContentProps {
    slug: string;
    name: string;
    metacritic?: number;
    cracked?: boolean;
    genres?: string[];
    loading: boolean;
}

export default function Content({
    metacritic,
    name,
    slug,
    cracked,
    genres = [],
    loading,
}: ContentProps) {
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

                {metacritic && (
                    <CircularProgressWithLabel
                        variant="determinate"
                        value={metacritic}
                        color="success"
                        size={30}
                    />
                )}
            </Stack>

            <Stack flexDirection="row" flexWrap="wrap" mt={1}>
                {genres.map(genre => (
                    <Chip sx={{ mr: 1, my: 0.5 }} label={genre} key={genre} />
                ))}
            </Stack>
        </CardContent>
    );
}
