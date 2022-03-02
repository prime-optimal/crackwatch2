import useSWR from "swr/immutable";

const key = "https://gamestatus.info/back/api/gameinfo/game/lastcrackedgames/";

export default function Recently() {
    const { data } = useSWR(key);

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
