import useSWR from "swr/immutable";

import { User } from "@types";

export const useUser = () => useSWR<User | Record<string, never>>("/auth/user");
