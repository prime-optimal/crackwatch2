import axios from "redaxios";
import useSWR from "swr/immutable";

export interface Settings {
    notifications: boolean;
}

export default function useSettingsMutation() {
    const { data, mutate } = useSWR<Settings>("/account/settings");

    const setNotifications = (notifications: boolean) => {
        mutate(data => ({ ...data, notifications }), false);
        mutate(async () => {
            const { data } = await axios.put("/account/settings", {
                notifications,
            });
            return data;
        }, false);
    };

    return { setNotifications, settings: data };
}
