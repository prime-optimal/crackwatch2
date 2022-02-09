import useSWR from "swr/immutable";

import { User } from "@types";

export function useUser() {
    const { data } = useSWR<User>("/auth/user");
    return data;
}
