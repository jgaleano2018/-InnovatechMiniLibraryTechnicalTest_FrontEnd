"use client";

import Link from "next/link";

export default function Sidebar() {

    return (

        <aside
            className="w-64 bg-slate-900 text-white h-screen"
        >

            <nav className="p-5">

                <ul className="space-y-5">

                    <li>

                        <Link href="/dashboard">

                            Dashboard

                        </Link>

                    </li>

                    <li>

                        <Link href="/books">

                            Books

                        </Link>

                    </li>

                    <li>

                        <Link href="/authors">

                            Authors

                        </Link>

                    </li>

                    <li>

                        <Link href="/borrow">

                            Borrow

                        </Link>

                    </li>

                    <li>

                        <Link href="/users">

                            Users

                        </Link>

                    </li>

                </ul>

            </nav>

        </aside>

    );

}