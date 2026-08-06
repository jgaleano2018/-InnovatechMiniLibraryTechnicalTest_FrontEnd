export class CheckOutUseCase{

    constructor(

        private repository:BorrowRepository

    ){}

    execute(request:any){

        return this.repository.checkOut(request);

    }

}