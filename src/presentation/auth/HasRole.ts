import {

useAuthStore

}

from "../store/authStore";

export function hasRole(

role:string

){

const{

currentUser

}=useAuthStore.getState();

if(!currentUser){

return false;

}

return currentUser.roles.includes(

role

);

}