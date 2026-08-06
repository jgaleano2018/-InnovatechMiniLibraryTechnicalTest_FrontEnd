import { BookResponse } from "@/application/dto/books/BookResponse";
import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class GetBookByIdUseCase {

    constructor(
        private repository: IBookRepository
    ) {}

    execute(id: number): Promise<BookResponse> {

        return this.repository.getById(id);

    }

}