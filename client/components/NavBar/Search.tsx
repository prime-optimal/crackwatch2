import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

import { AxiosGames } from "@types";

import { ResponsiveImage } from "@components";

export default function Search() {
    const [inputValue, setInputValue] = useState("");
    const [debounced] = useDebounce(inputValue, 400);

    const { data } = useSWR<AxiosGames>(
        debounced ? `/games/search?q=${encodeURIComponent(debounced)}` : null
    );

    return (
        <Box minWidth={200} flex={1} maxWidth={600}>
            <Autocomplete
                inputValue={inputValue}
                onInputChange={(_, value) => setInputValue(value)}
                filterOptions={x => x}
                options={data?.results || []}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder="Search"
                renderInput={props => <TextField {...props} label="Search" />}
                renderOption={(props, { name, released, background_image }) => (
                    <Stack
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        component="li"
                        flexDirection="row"
                        {...props}
                    >
                        <Box height={60} flex="1 1 30px">
                            <ResponsiveImage
                                props={{
                                    borderRadius: theme => `${theme.shape.borderRadius}px`,
                                    overflow: "hidden",
                                }}
                                src={background_image}
                            />
                        </Box>
                        <Box flex={7} ml={1}>
                            <Typography>{name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {released}
                            </Typography>
                        </Box>
                    </Stack>
                )}
            />
        </Box>
    );
}
