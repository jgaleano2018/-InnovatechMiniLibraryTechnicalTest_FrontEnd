import { BookResponse } from "@/application/dto/books/BookResponse";
import { CreateBookRequest } from "@/application/dto/books/CreateBookRequest";
import { UpdateBookRequest } from "@/application/dto/books/UpdateBookRequest";

export interface IBookRepository {

    search(search: string): Promise<BookResponse[]>;

    getById(id: number): Promise<BookResponse>;

    create(request: CreateBookRequest): Promise<void>;

    update(id: number, request: UpdateBookRequest): Promise<void>;

    delete(id: number): Promise<void>;

}