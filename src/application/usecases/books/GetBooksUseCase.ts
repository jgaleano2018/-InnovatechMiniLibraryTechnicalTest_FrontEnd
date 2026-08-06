import { BookRepository } from "@/infrastructure/repositories/BookRepository";

export class GetBooksUseCase {

    constructor(private repository: BookRepository) {}

    execute() {
        return this.repository.getAll();
    }

}