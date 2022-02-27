import UpcomingIcon from "@mui/icons-material/Upcoming";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
} from "@mui/material";

import { useStore } from "./store";

const filters = [
    {
        name: "Popular",
        icon: <WhatshotIcon />,
        description: "Games that are currently popular",
    },
    {
        name: "Anticipated",
        icon: <UpcomingIcon />,
        description: "The most anticipated upcoming releases",
    },
];

export default function Filters() {
    const { setAnticipatedGames, setPopularGames } = useStore(store => store.actions);

    const active = useStore(store => store.state.filters.active);

    const onClick = (name: string) => {
        switch (name) {
            case "Popular":
                setPopularGames();
                break;
            case "Anticipated":
                setAnticipatedGames();
                break;
        }
    };

    return (
        <Box component={Paper}>
            <List>
                {filters.map(({ icon, name, description }) => (
                    <ListItem key={name}>
                        <ListItemButton
                            selected={active === name}
                            onClick={() => onClick(name)}
                        >
                            <ListItemAvatar>{icon}</ListItemAvatar>
                            <ListItemText primary={name} secondary={description} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
