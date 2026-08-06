export function setTokenCookie(token: string) {

    document.cookie =

        `token=${token}; path=/; SameSite=Lax`;

}

export function deleteTokenCookie() {

    document.cookie =

        "token=; Max-Age=0; path=/";

}