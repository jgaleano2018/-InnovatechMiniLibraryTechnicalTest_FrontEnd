import { UpdateBookRequest } from "@/application/dto/books/UpdateBookRequest";

import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class UpdateBookUseCase {

    constructor(

        private repository: IBookRepository

    ) {}

    execute(

        id: number,

        request: UpdateBookRequest

    ): Promise<void> {

        return this.repository.update(

            id,

            request

        );

    }

}