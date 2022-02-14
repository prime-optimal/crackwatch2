import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

export const useGame = () => {
    const { slug = null } = useRouter().query;
    return useSWR<AxiosGame>(slug && `/game/${slug}`);
};
