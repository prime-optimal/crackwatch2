import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button } from "@mui/material";

export default function Filters() {
    return (
        <Box>
            <Button startIcon={<FilterListIcon />} size="large">
                Filters
            </Button>
        </Box>
    );
}
