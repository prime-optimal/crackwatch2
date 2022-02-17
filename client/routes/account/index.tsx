import {
    Avatar,
    Box,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

import { Provider } from "@types";

import useUser from "@hooks/useUser";

import tryToCatch from "@utils/catch";

import { queries } from "./queries";

const ProviderTiers = {
    s: ["gamestatus", "steamcrackedgames"] as Provider[],
    b: ["pcgamestorrents", "skidrow"] as Provider[],
    c: ["1337x"] as Provider[],
};

const tierMap = {
    s: "popular games, ~99% accuracy (recommended)",
    b: "popular, indie games, ~85% accuracy",
    c: "every game, ~70% accuracy",
};

export default function Account() {
    const { data: user, mutate } = useUser();
    const [loading, setLoading] = useState(false);

    if (!user?.nickname) {
        return (
            <Typography align="center" variant="h3" mt={3}>
                Not logged in
            </Typography>
        );
    }

    const onChange = async (provider: Provider, checked: boolean) => {
        if (checked) {
            const providers = [...user.providers, provider];
            const [result, error] = await tryToCatch(() => queries.providersPut(providers));

            if (!result) {
                console.error(error);
                return;
            }

            await mutate();
            return;
        }

        const providers = user.providers.filter(x => x !== provider);
        const [result, error] = await tryToCatch(() => queries.providersPut(providers));

        if (!result) {
            console.error(error);
            return;
        }

        await mutate();
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Box component={Paper} p={2}>
                <Stack
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
                    <Typography ml={1} variant="h3">
                        {user.nickname}
                        <Typography color="text.secondary">{user.email}</Typography>
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h4">Providers</Typography>

                {Object.keys(ProviderTiers).map(tier => (
                    <Box key={tier} my={3}>
                        <Typography variant="h6">
                            Tier {tier.toUpperCase()} -{" "}
                            <Typography component="span" color="text.secondary">
                                {tierMap[tier as keyof typeof ProviderTiers]}
                            </Typography>
                        </Typography>

                        {ProviderTiers[tier as keyof typeof ProviderTiers].map(provider => (
                            <FormControlLabel
                                key={provider}
                                label={<Typography variant="button">{provider}</Typography>}
                                control={
                                    <Checkbox
                                        onChange={async (_, checked) => {
                                            setLoading(true);
                                            await onChange(provider, checked);
                                            setLoading(false);
                                        }}
                                        checked={user.providers.includes(provider)}
                                        disabled={loading}
                                    />
                                }
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
