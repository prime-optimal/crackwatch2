import { MutatorOptions, useSWRConfig } from "swr";
import useSWR from "swr/immutable";

import { User } from "@types";

export function useUser() {
    const { data } = useSWR<User>("/auth/user");
    return data;
}

export function useUserMutation() {
    const { mutate } = useSWRConfig();
    return (data?: any, opts?: MutatorOptions | boolean) => mutate("/auth/user", data, opts);
}
