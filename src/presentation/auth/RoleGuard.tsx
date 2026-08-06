"use client";

import {

ReactNode

}

from "react";

import {

hasRole

}

from "./HasRole";

interface Props{

role:string;

children:ReactNode;

}

export default function RoleGuard({

role,

children

}:Props){

if(

!hasRole(role)

){

return null;

}

return<>{children}</>;

}