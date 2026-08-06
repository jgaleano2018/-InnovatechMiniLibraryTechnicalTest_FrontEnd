import { CreateBookRequest } from "@/application/dto/books/CreateBookRequest";

import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class CreateBookUseCase {

    constructor(

        private repository: IBookRepository

    ) {}

    execute(request: CreateBookRequest): Promise<void> {

        return this.repository.create(request);

    }

}