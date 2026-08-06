import { BookResponse } from "@/application/dto/books/BookResponse";
import { BaseRepository } from "./BaseRepository";
import { httpClient } from "../api/httpClient";
import { IBookRepository } from "@/domain/repositories/IBookRepository";

export class BookRepository
    extends BaseRepository
    implements IBookRepository {

    async search(search: string) {

        return this.execute(async () => {

            const response =
                await httpClient.get<BookResponse[]>(
                    `api/Books/search/${search}`
                );

            return response.data;

        });

    }

    async create(request: any) {

        return this.execute(async () => {

            await httpClient.post(
                "api/Books",
                request
            );

        });

    }

    async update(id: number, request: any) {

        return this.execute(async () => {

            await httpClient.put(
                `api/Books/${id}`,
                request
            );

        });

    }

    async delete(id: number) {

        return this.execute(async () => {

            await httpClient.delete(
                `api/Books/${id}`
            );

        });

    }

    async getById(id: number) {

        return this.execute(async () => {

            const response =
                await httpClient.get<BookResponse>(
                    `api/Books/${id}`
                );

            return response.data;

        });

    }

    async getAll() {

        return this.execute(async () => {

            const response =
                await httpClient.get<BookResponse[]>(
                    "api/Books"
                );

            return response.data;

        });

    }

}