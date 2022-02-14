import { Avatar, Box, Container, Divider, Paper, Stack, Typography } from "@mui/material";

import useUser from "@hooks/useUser";

import { ProviderTiers } from "@utils/searchers";

const tierMap = {
    s: "popular games, ~98% accuracy",
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

                <Typography variant="h5">Providers</Typography>

                {Object.keys(ProviderTiers).map(tier => (
                    <Box key={tier} my={2}>
                        <Typography>
                            Tier {tier.toUpperCase()} -{" "}
                            {tierMap[tier as keyof typeof ProviderTiers]}
                        </Typography>

                        <Typography>
                            {ProviderTiers[tier as keyof typeof ProviderTiers].join(", ")}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
