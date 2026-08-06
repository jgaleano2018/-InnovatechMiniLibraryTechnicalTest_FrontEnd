export const Routes = {

    LOGIN: "/login",

    DASHBOARD: "/",

    BOOKS: "/books",

    BOOKS_NEW: "/books/new",

    BORROW: "/borrow",

    BORROW_CHECKOUT: "/borrow/checkout",

    BORROW_CHECKIN: "/borrow/checkin"

} as const;

export const PublicRoutes: string[] = [
  Routes.LOGIN
];