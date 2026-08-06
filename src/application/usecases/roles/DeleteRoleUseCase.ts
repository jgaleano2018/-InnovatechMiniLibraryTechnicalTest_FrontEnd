export class DeleteRoleUseCase{

constructor(

private repository:IRoleRepository

){}

execute(id:number){

return this.repository.delete(id);

}

}