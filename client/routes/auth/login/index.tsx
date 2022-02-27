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
import NextLink from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";

import useUserMutation from "@hooks/mutations/useUserMutation";

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

    const { login } = useUserMutation();

    const onSubmit = async (data: LoginArgs) => {
        await login(data);
        Router.replace("/");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
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
                    <NextLink href="/auth/register" passHref>
                        <MuiLink underline="hover">Register</MuiLink>
                    </NextLink>
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