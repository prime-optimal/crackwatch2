import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { useState } from "react";

import GameTable from "./GameTable";

export default function DenuvoGames() {
    const [value, setValue] = useState(0);

    return (
        <Paper>
            <FormControl sx={{ m: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                    label="Type"
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                    fullWidth
                >
                    <MenuItem value={0}>Uncracked</MenuItem>
                    <MenuItem value={1}>Cracked</MenuItem>
                    <MenuItem value={2}>All</MenuItem>
                </Select>
            </FormControl>

            <GameTable type={value} />
        </Paper>
    );
}
