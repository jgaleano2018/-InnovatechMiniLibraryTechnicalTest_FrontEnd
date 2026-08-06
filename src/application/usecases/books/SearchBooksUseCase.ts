import { BookResponse } from "@/application/dto/books/BookResponse";

import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class SearchBooksUseCase {

    constructor(

        private repository: IBookRepository

    ) {}

    execute(search: string): Promise<BookResponse[]> {

        return this.repository.search(search);

    }

}