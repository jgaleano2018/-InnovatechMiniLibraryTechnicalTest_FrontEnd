export class CreateRoleUseCase{

constructor(

private repository:IRoleRepository

){}

execute(request:any){

return this.repository.create(request);

}

}