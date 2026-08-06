export const Roles = {

    Administrator: "Administrator",

    Librarian: "Librarian",

    Guest: "Guest"

} as const;

export type Role =
    typeof Roles[keyof typeof Roles];