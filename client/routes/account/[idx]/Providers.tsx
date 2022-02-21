import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { memo } from "react";

import { Provider } from "@types";

import useProvidersMutation from "@hooks/mutations/useProvidersMutation";
import { defaultProviders } from "@hooks/useCrack";
import useLoggedIn from "@hooks/useLoggedIn";

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
    const {
        addProvider,
        removeProvider,
        providers = defaultProviders,
    } = useProvidersMutation();

    const loggedIn = useLoggedIn();

    const onChange = (provider: Provider, willChecked: boolean) => {
        if (willChecked) {
            addProvider(provider);
            return;
        }

        removeProvider(provider);
    };

    return (
        <Stack>
            {Object.keys(ProviderTiers).map(tier => (
                <Box key={tier} mb={3}>
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
                                    checked={providers.includes(provider)}
                                    onChange={(_, checked) => onChange(provider, checked)}
                                    disabled={!loggedIn}
                                />
                            }
                        />
                    ))}
                </Box>
            ))}
        </Stack>
    );
}

export default memo(Providers);
