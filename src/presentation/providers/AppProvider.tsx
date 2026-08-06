"use client";

import QueryProvider from "./QueryProvider";

export default function AppProvider({

children

}:{

children:React.ReactNode

}){

return(

<QueryProvider>

{children}

</QueryProvider>

);

}