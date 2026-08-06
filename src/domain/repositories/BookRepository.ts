import { httpClient } from "@/infrastructure/api/httpClient";

import { BaseRepository } from "./BaseRepository";

import { API } from "@/shared/constants/api";

import { IBookRepository } from "@/domain/repositories/IBookRepository";

import { BookResponse } from "@/application/dto/books/BookResponse";

import { CreateBookRequest } from "@/application/dto/books/CreateBookRequest";

import { UpdateBookRequest } from "@/application/dto/books/UpdateBookRequest";

export class BookRepository
extends BaseRepository
implements IBookRepository {

    search(search: string): Promise<BookResponse[]> {

        return this.execute(async () => {

            const response =
                await httpClient.get<BookResponse[]>(

                    `${API.BOOKS}/search/${search}`

                );

            return response.data;

        });

    }

    create(request: CreateBookRequest): Promise<void> {

        return this.execute(async () => {

            await httpClient.post(

                API.BOOKS,

                request

            );

        });

    }

    update(

        id: number,

        request: UpdateBookRequest

    ): Promise<void> {

        return this.execute(async () => {

            await httpClient.put(

                `${API.BOOKS}/${id}`,

                request

            );

        });

    }

    delete(id: number): Promise<void> {

        return this.execute(async () => {

            await httpClient.delete(

                `${API.BOOKS}/${id}`

            );

        });

    }

}