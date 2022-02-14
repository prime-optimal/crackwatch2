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

import useUser from "@hooks/useUser";

import { ProviderTiers } from "@utils/searchers";

const tierMap = {
    s: "popular games, ~98% accuracy (recommended)",
    b: "popular, indie games, ~85% accuracy",
    c: "every game, ~70% accuracy",
};

export default function Account() {
    const { data: user } = useUser();

    if (!user?.nickname) {
        return (
            <Typography align="center" variant="h3" mt={3}>
                Not logged in
            </Typography>
        );
    }

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
                    <Stack key={tier} my={3}>
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
                                control={<Checkbox />}
                            />
                        ))}
                    </Stack>
                ))}
            </Box>
        </Container>
    );
}
