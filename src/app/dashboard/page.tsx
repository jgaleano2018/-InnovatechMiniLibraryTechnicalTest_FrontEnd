import Navbar from "@/presentation/layouts/Navbar";

import Sidebar from "@/presentation/layouts/Sidebar";

export default function Dashboard() {

    return (

        <>

            <Navbar/>

            <div className="flex">

                <Sidebar/>

                <main className="p-10 flex-1">

                    <h1 className="text-4xl font-bold">

                        Dashboard

                    </h1>

                    <div
                        className="grid grid-cols-4 gap-5 mt-8"
                    >

                        <div className="shadow rounded p-6">

                            Books

                        </div>

                        <div className="shadow rounded p-6">

                            Authors

                        </div>

                        <div className="shadow rounded p-6">

                            Borrow

                        </div>

                        <div className="shadow rounded p-6">

                            Users

                        </div>

                    </div>

                </main>

            </div>

        </>

    );

}