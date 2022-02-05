import { useRouter } from "next/router";
import useSWR from "swr/immutable";

import { AxiosGame } from "@types";

export default function Game() {
    const { id = null } = useRouter().query;

    const { data } = useSWR<AxiosGame>(id && `/game/${id}`);

    return <div>{JSON.stringify(data)}</div>;
}
