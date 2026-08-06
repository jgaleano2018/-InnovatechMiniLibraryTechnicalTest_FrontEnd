import { isExpired } from "./jwt";

import { StorageKeys } from "../constants/storage";

export function hasSession() {

    const token =

        localStorage.getItem(StorageKeys.TOKEN);

    if (!token) {

        return false;

    }

    return !isExpired(token);

}