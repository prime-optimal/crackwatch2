import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LoadingButton as Button } from "@mui/lab";
import {
    Box,
    Container,
    Link as MuiLink,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";

import useUserMutation from "@hooks/mutations/useUserMutation";
import useNotistack from "@hooks/useNotistack";

import tryToCatch from "@utils/catch";
import parseError from "@utils/parse-error";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export interface LoginArgs {
    email: string;
    password: string;
}

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<LoginArgs>();

    const snack = useNotistack();

    const { login } = useUserMutation();

    const onSubmit = async (data: LoginArgs) => {
        const [result, error] = await tryToCatch(() => login(data));
        if (!result) {
            snack.error(parseError(error));
            return;
        }

        Router.replace("/");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Head>
                <title>Login to crackwatch2</title>
            </Head>

            <Paper component="form" sx={{ px: 4, py: 2 }} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email", {
                        required: "Bro, where is your email?",
                        pattern: {
                            value: emailRegex,
                            message: "That is not an email",
                        },
                        maxLength: {
                            value: 100,
                            message: "That is too long",
                        },
                    })}
                />

                <TextField
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    label="Password"
                    type="password"
                    fullWidth
                    sx={{ mt: 3 }}
                    {...register("password", {
                        required: "Logging in without a password heh?",
                        minLength: {
                            value: 6,
                            message: "Your password should be at least 6 characters, trust me",
                        },
                        maxLength: {
                            value: 100,
                            message: "That is too long",
                        },
                    })}
                />

                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={2}
                >
                    <Stack>
                        <NextLink href="/auth/register" passHref>
                            <MuiLink underline="hover">Register</MuiLink>
                        </NextLink>
                        <NextLink href="/auth/recover/generate" passHref>
                            <MuiLink underline="hover">Forgot password</MuiLink>
                        </NextLink>
                    </Stack>

                    <Box>
                        <Button
                            type="submit"
                            endIcon={<LockOpenIcon />}
                            loading={isSubmitting}
                        >
                            Login
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
