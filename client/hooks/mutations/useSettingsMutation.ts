import axios from "redaxios";
import useSWR from "swr/immutable";

export interface Settings {
    notifications: boolean;
}

export default function useSettingsMutation() {
    const { data, mutate } = useSWR<Settings>("/account/settings");

    const setNotifications = (notifications: boolean) => {
        mutate(data => ({ ...data, notifications }), false);
        mutate(
            axios
                .put("/account/settings", {
                    notifications,
                })
                .then(x => x.data),

            false
        );
    };

    return { setNotifications, settings: data };
}
