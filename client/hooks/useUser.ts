import axios from "redaxios";
import type { SWRConfiguration } from "swr";
import useSWR from "swr/immutable";

import { User } from "@types";

type SWRUser = User | Record<string, never>;

const fetcher = (url: string) => axios.get(url).then(x => x.data);

const useUser = (opts?: SWRConfiguration<SWRUser>) =>
    useSWR<SWRUser>("/auth/user", fetcher, opts);

export default useUser;
