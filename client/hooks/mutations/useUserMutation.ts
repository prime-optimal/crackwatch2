import axios from "redaxios";
import useSWR from "swr/immutable";

import tryToCatch from "@utils/catch";

import type { LoginArgs } from "@routes/auth/login";
import type { RegisterArgs } from "@routes/auth/register";

export interface User {
    nickname: string;
    email: string;
    avatar: string;
    createdAt: string;
}

export default function useUserMutation() {
    const { data: user, mutate } = useSWR<User | Record<string, never>>("/auth/user");

    const logout = async () => {
        mutate({}, false);
        await axios.post("/auth/logout");
    };

    const login = (data: LoginArgs) => {
        return mutate(
            axios.post("/auth/login", data).then(x => x.data),
            false
        );
    };

    const register = (data: RegisterArgs) => {
        return axios.post("/auth/register", data);
    };

    const validateNickname = async (nickname: string) => {
        const [result] = await tryToCatch(() =>
            axios.post<boolean>("/validate/nickname", { nickname })
        );
        if (!result) {
            return "There was an error validating nickname";
        }

        return result.data || "This nickname is already taken, sorry";
    };

    return {
        login,
        logout,
        register,
        user,
        validateNickname,
    };
}
