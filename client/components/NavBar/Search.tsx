import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

import { AxiosGames } from "@types";

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
            />
        </Box>
    );
}
