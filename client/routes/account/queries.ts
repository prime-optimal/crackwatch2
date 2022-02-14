import axios from "redaxios";

import { Provider } from "@types";

export const queries = {
    providersPut: (providers: Provider[]) => axios.put("/account/providers", { providers }),
};
