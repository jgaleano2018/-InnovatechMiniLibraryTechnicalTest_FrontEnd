"use client";

import {

ReactNode

}

from "react";

import {

hasPermission

}

from "./HasPermission";

interface Props{

permission:string;

children:ReactNode;

}

export default function PermissionGuard({

permission,

children

}:Props){

if(

!hasPermission(permission)

){

return null;

}

return<>{children}</>;

}