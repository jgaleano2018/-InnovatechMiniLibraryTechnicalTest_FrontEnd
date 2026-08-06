export class GetRolesUseCase{

constructor(

private repository:IRoleRepository

){}

execute(){

return this.repository.getAll();

}

}