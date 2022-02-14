import useSWR from "swr/immutable";

import { User } from "@types";

const useUser = () => useSWR<User | Record<string, never>>("/auth/user");

export default useUser;
