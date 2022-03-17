import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "redaxios";

import useNotistack from "@hooks/useNotistack";

import tryToCatch from "@utils/catch";
import parseError from "@utils/parse-error";

interface ResetArgs {
    password: string;
    confirm: string;
}

export default function Reset() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors },
    } = useForm<ResetArgs>();

    const { query } = useRouter();
    const snack = useNotistack();

    const onSubmit = async ({ password }: ResetArgs) => {
        const [result, error] = await tryToCatch(() =>
            axios.post("/auth/recover/reset", { password, key: query.key })
        );
        if (!result) {
            snack.error(parseError(error));
            return;
        }

        snack.success("Password changed");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Head>
                <title>Reset password</title>
            </Head>

            <Paper component="form" sx={{ px: 4, py: 2 }} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" align="center" gutterBottom>
                    Reset password
                </Typography>

                <TextField
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password", {
                        required: "Enter a password",
                        minLength: {
                            value: 6,
                            message: "Your password should be at least 6 chars",
                        },
                    })}
                />

                <TextField
                    error={!!errors.confirm}
                    helperText={errors.confirm?.message}
                    sx={{ mt: 3 }}
                    fullWidth
                    label="Confirm password"
                    type="password"
                    {...register("confirm", {
                        validate: pass =>
                            pass !== watch("password") ? "Passwords don't match" : undefined,
                    })}
                />

                <Stack mt={2} alignItems="flex-end">
                    <Box>
                        <Button type="submit" disabled={isSubmitting} endIcon={<KeyIcon />}>
                            Reset
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
