export class UpdateRoleUseCase{

constructor(

private repository:IRoleRepository

){}

execute(

id:number,

request:any

){

return this.repository.update(

id,

request

);

}

}