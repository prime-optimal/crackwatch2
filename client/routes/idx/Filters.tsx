import FilterListIcon from "@mui/icons-material/FilterList";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    Grow,
    Slider,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

import { clamp } from "@utils";

import { useStore } from "./store";

const DateSlider = () => {
    const months = useStore(store => store.state.filters.state.months);
    const { setMonths } = useStore(store => store.actions);

    const onChange = (event: Event, newValue: number | number[]) => {
        const value = [...(newValue as number[])];

        value[0] = clamp(value[0], -12, -1);
        value[1] = clamp(value[1], 0, 12);

        setMonths(value);
    };

    const labelFormat = (value: number) => {
        const date = new Date().setMonth(new Date().getMonth() + value);
        return new Date(date).toLocaleDateString(window.navigator.language, {
            year: "2-digit",
            month: "narrow",
        });
    };

    return (
        <Slider
            marks
            valueLabelDisplay="auto"
            value={months}
            onChange={onChange}
            valueLabelFormat={labelFormat}
            step={1}
            min={-12}
            max={12}
        />
    );
};

export default function Filters() {
    const { applyMonths } = useStore(store => store.actions);
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <Dialog
                TransitionComponent={Grow}
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <Stack px={6} py={4}>
                    <Typography gutterBottom variant="h6">
                        Release date period
                    </Typography>
                    <DateSlider />
                </Stack>

                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            applyMonths();
                            setOpen(false);
                        }}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>

            <Button onClick={() => setOpen(true)} startIcon={<FilterListIcon />} size="large">
                Filters
            </Button>
        </Box>
    );
}
