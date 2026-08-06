import { CheckInRequest } from "@/application/dto/borrow/CheckInRequest";
import { CheckOutRequest } from "@/application/dto/borrow/CheckOutRequest";

export interface IBorrowRepository {

    checkIn(request: CheckInRequest): Promise<void>;

    checkOut(request: CheckOutRequest): Promise<void>;

}