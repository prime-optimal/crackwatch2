import useSWR from "swr/immutable";

import { User } from "@types";

const useUser = () => {
    const swr = useSWR<User | Record<string, never>>("/auth/user");
    return { ...swr };
};

export default useUser;
