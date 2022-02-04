import { Autocomplete, Box, TextField } from "@mui/material";

export default function Search() {
    return (
        <Box minWidth={150} flex={1}>
            <Autocomplete
                options={[]}
                placeholder="Search"
                renderInput={props => <TextField {...props} label="Search" />}
            />
        </Box>
    );
}
