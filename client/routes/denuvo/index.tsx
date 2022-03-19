import { Container, Grid } from "@mui/material";

import DenuvoGames from "./DenuvoGames";

export default function Denuvo() {
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid container>
                <Grid item>
                    <DenuvoGames />
                </Grid>
            </Grid>
        </Container>
    );
}
