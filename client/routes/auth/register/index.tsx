import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton as Button } from "@mui/lab";
import { Box, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "redaxios";

import tryToCatch from "@utils/catch";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const nicknameRegex = /^[a-zA-Z]\w*$/g;

interface RegisterArgs {
    nickname: string;
    email: string;
    password: string;
}

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<RegisterArgs>();

    const onSubmit = async (data: RegisterArgs) => {
        const [result, error] = await tryToCatch(() => axios.post("/auth/register", data));
        if (!result) {
            alert(`There was an error ${JSON.stringify(error)}`);
            return;
        }
        return result;
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper component="form" sx={{ px: 4, py: 2 }} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>

                <TextField
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                    label="Nickname"
                    fullWidth
                    {...register("nickname", {
                        required: "Be creative man",
                        pattern: {
                            value: nicknameRegex,
                            message: "This nickname is invalid",
                        },
                        minLength: {
                            value: 4,
                            message: "Your nickname should be at least 4 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "That is too long",
                        },
                    })}
                />

                <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label="Email"
                    type="email"
                    fullWidth
                    sx={{ mt: 3 }}
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

                <Stack alignItems="flex-end" mt={2}>
                    <Box>
                        <Button type="submit" endIcon={<LockIcon />} loading={isSubmitting}>
                            Register
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
