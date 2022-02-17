import axios from "axios";

import { Provider } from "@types";

export const queries = {
    providersPut: (providers: Provider[]) => axios.put("/account/providers", { providers }),
};
