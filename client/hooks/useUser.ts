import { useCallback, useState } from "react";
import useSWR from "swr";

import { User } from "@types";

type SWRUser = User | Record<string, never>;

const useUser = () => {
    const { isValidating, mutate, ...rest } = useSWR<SWRUser>("/auth/user");
    const [loading, setLoading] = useState(isValidating);

    const customMutator: typeof mutate = useCallback(
        async (...args) => {
            setLoading(true);
            const mutation = await mutate(...args);
            setLoading(false);

            return mutation;
        },
        [mutate]
    );

    return {
        ...rest,
        isValidating,
        mutate: customMutator,
        loading: isValidating && loading,
    };
};

export default useUser;
