import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

export default function Game() {
    const { slug = null } = useRouter().query;

    const { data } = useSWR<AxiosGame>(slug && `/game/${slug}`);

    return <div>{JSON.stringify(data)}</div>;
}
