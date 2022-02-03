import { Card, Container, Text } from "@mantine/core";
import { Grid } from "@mantine/core";
import useSWR from "swr";

import { AxiosGamesPopular } from "@types";

import { ResponsiveImage } from "@components";

export default function Popular() {
    const { data } = useSWR<AxiosGamesPopular>("/games/popular");

    return (
        <Container size="xl">
            <Grid grow>
                {data?.results.map(({ id, name, background_image }) => (
                    <Grid.Col xs={12} md={6} key={id}>
                        <Card shadow="md" padding="lg">
                            <Card.Section sx={{ height: 150 }}>
                                <ResponsiveImage src={background_image} />
                            </Card.Section>
                            <Text>{name}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
