import { httpClient }

from "../api/httpClient";

import { BaseRepository }

from "./BaseRepository";

import {

RoleResponse

}

from "@/application/dto/roles/RoleResponse";

import {

CreateRoleRequest

}

from "@/application/dto/roles/CreateRoleRequest";

import {

UpdateRoleRequest

}

from "@/application/dto/roles/UpdateRoleRequest";

import {

IRoleRepository

}

from "@/domain/repositories/IRoleRepository";

export class RoleRepository

extends BaseRepository

implements IRoleRepository{

async getAll(){

return this.execute(async()=>{

const response=

await httpClient.get<RoleResponse[]>(

"api/Roles"

);

return response.data;

});

}

async getById(id:number){

return this.execute(async()=>{

const response=

await httpClient.get<RoleResponse>(

`api/Roles/${id}`

);

return response.data;

});

}

async create(

request:CreateRoleRequest

){

return this.execute(async()=>{

await httpClient.post(

"api/Roles",

request

);

});

}

async update(

id:number,

request:UpdateRoleRequest

){

return this.execute(async()=>{

await httpClient.put(

`api/Roles/${id}`,

request

);

});

}

async delete(id:number){

return this.execute(async()=>{

await httpClient.delete(

`api/Roles/${id}`

);

});

}

}