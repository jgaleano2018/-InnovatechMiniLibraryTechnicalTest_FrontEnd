export const Permissions = {

    BOOK_READ: "BOOK_READ",

    BOOK_CREATE: "BOOK_CREATE",

    BOOK_UPDATE: "BOOK_UPDATE",

    BOOK_DELETE: "BOOK_DELETE",

    BORROW_CHECKOUT: "BORROW_CHECKOUT",

    BORROW_CHECKIN: "BORROW_CHECKIN",

    USER_ADMIN: "USER_ADMIN",

    ROLE_ADMIN: "ROLE_ADMIN"

} as const;

export type Permission =
    typeof Permissions[keyof typeof Permissions];