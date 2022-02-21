import useSWR from "swr/immutable";

export default function useLoggedIn() {
    const { data } = useSWR<any>("/auth/user");
    return !!data?.nickname;
}
