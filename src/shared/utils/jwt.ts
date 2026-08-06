import { jwtDecode } from "jwt-decode";

export interface JwtPayload {

    exp: number;

    email?: string;

    given_name?: string;

    family_name?: string;

    roles?: string[];

    permissions?: string[];

}

export function decodeToken(token: string) {

    return jwtDecode<JwtPayload>(token);

}

export function isExpired(token: string) {

    const payload = decodeToken(token);

    return Date.now() >= payload.exp * 1000;

}