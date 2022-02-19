import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { dequal } from "dequal";
import { memo } from "react";
import axios from "redaxios";

import { Provider } from "@types";

import useUser from "@hooks/useUser";

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

function Providers() {
    const { data: user, isValidating, mutate } = useUser();

    const onChange = (provider: Provider, checked: boolean) => {
        mutate(async user => {
            if (!user?.nickname) return;

            if (checked) {
                const fresh = [...user.providers, provider];
                const { data: providers } = await axios.put("/account/providers", {
                    providers: fresh,
                });

                return { ...user, providers } as any;
            }

            const fresh = user.providers.filter(x => x !== provider);
            const { data: providers } = await axios.put("/account/providers", {
                providers: fresh,
            });

            return { ...user, providers } as any;
        });
    };

    return (
        <Stack>
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
                                    onChange={(_, checked) => onChange(provider, checked)}
                                    checked={user?.providers.includes(provider)}
                                    disabled={isValidating}
                                />
                            }
                        />
                    ))}
                </Box>
            ))}
        </Stack>
    );
}

export default memo(Providers, dequal);
