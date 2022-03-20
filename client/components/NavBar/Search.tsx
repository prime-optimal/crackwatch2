import {
    Autocomplete,
    Box,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Router from "next/router";
import { HTMLAttributes, useState } from "react";
import useSWR from "swr/immutable";
import { useDebounce } from "use-debounce";

import { AxiosGames, ResultGames } from "@types";

import ResponsiveImage from "@components/ResponsiveImage";

const renderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    { name, released, background_image }: ResultGames
) => (
    <Stack
        justifyContent="flex-start"
        alignItems="flex-start"
        component="li"
        flexDirection="row"
        {...props}
    >
        <Box height={60} flex="1 1 70px">
            <ResponsiveImage
                props={{
                    borderRadius: ({ shape }) => `${shape.borderRadius}px`,
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
);

export default function Search() {
    const [inputValue, setInputValue] = useState("");
    const [debounced] = useDebounce(inputValue, 400);

    const { data } = useSWR<AxiosGames>(
        debounced ? `/games/search?q=${encodeURIComponent(debounced)}` : null
    );

    const loading = !!(!data && inputValue);

    return (
        <Box flex={1} maxWidth={550} px={2}>
            <Autocomplete
                loading={loading}
                inputValue={inputValue}
                onInputChange={(_, value) => setInputValue(value)}
                onChange={(_, value, reason) => {
                    if (reason === "selectOption") {
                        Router.push(`/game/${value?.slug}`);
                    }
                }}
                filterOptions={x => x}
                options={data?.results || []}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder="Search"
                renderInput={props => (
                    <TextField
                        {...props}
                        label="Search"
                        variant="standard"
                        InputProps={{
                            ...props.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {props.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                renderOption={renderOption}
            />
        </Box>
    );
}
