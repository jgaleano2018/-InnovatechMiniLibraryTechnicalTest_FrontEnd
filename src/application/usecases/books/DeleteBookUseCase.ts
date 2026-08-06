import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class DeleteBookUseCase {

    constructor(

        private repository: IBookRepository

    ) {}

    execute(id: number): Promise<void> {

        return this.repository.delete(id);

    }

}