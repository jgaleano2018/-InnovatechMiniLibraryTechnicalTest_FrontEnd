import { AuthorResponse }

from "@/application/dto/authors/AuthorResponse";

export interface IAuthorRepository{

    getAll():Promise<AuthorResponse[]>;

}