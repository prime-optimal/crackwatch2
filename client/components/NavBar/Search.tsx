import { Autocomplete, Box, TextField } from "@mui/material";

export default function Search() {
    return (
        <Box minWidth={200} flex={1} maxWidth={600}>
            <Autocomplete
                options={[]}
                placeholder="Search"
                renderInput={props => <TextField {...props} label="Search" />}
            />
        </Box>
    );
}
