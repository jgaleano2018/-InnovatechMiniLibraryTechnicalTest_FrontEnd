export class CheckInUseCase{

    constructor(

        private repository:BorrowRepository

    ){}

    execute(request:any){

        return this.repository.checkIn(request);

    }

}