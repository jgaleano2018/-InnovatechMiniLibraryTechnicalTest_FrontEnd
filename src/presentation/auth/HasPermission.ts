import {

useAuthStore

}

from "../store/authStore";

export function hasPermission(

permission:string

){

const{

currentUser

}=useAuthStore.getState();

if(!currentUser){

return false;

}

return currentUser.permissions.includes(

permission

);

}