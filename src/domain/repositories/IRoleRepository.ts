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

export interface IRoleRepository{

    getAll():Promise<RoleResponse[]>;

    getById(id:number):Promise<RoleResponse>;

    create(request:CreateRoleRequest):Promise<void>;

    update(

        id:number,

        request:UpdateRoleRequest

    ):Promise<void>;

    delete(id:number):Promise<void>;

}