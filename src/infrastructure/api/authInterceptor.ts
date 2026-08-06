import { httpClient } from "./httpClient";

import { StorageKeys } from "@/shared/constants/storage";

httpClient.interceptors.request.use(config => {

    const token =

        localStorage.getItem(StorageKeys.TOKEN);

    if (token) {

        config.headers.Authorization =

            `Bearer ${token}`;

    }

    config.headers["Content-Type"] =

        "application/json";

    return config;

});