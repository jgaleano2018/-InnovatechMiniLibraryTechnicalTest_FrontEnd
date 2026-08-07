import { httpClient } from "@/infrastructure/api/httpClient";
import { API } from "@/shared/constants/api";
import { BaseRepository } from "./BaseRepository";
import { CheckInRequest } from "@/application/dto/borrow/CheckInRequest";
import { CheckOutRequest } from "@/application/dto/borrow/CheckOutRequest";
import { IBorrowRepository, BorrowResponse } from "@/domain/repositories/IBorrowRepository";

export class BorrowRepository
    extends BaseRepository
    implements IBorrowRepository {

    async getByBookId(bookId: number): Promise<BorrowResponse> {
        return this.execute(async () => {
            const response = await httpClient.get<BorrowResponse>(
                `${API.BORROW_CHECKIN}/book/${bookId}`
            );
            return response.data;
        });
    }

    async checkIn(request: CheckInRequest): Promise<void> {
        return this.execute(async () => {
            await httpClient.post(
                API.BORROW_CHECKIN,
                request
            );
        });
    }

    async checkOut(request: CheckOutRequest): Promise<void> {
        return this.execute(async () => {
            await httpClient.post(
                API.BORROW_CHECKOUT,
                request
            );
        });
    }
}