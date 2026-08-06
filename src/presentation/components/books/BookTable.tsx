import BookRow from "./BookRow";

import { BookResponse } from "@/application/dto/books/BookResponse";

interface Props {

    books: BookResponse[];

    onDelete(id: number): void;

}

export default function BookTable({

    books,

    onDelete

}: Props) {

    return (

        <table className="w-full">

            <thead>

                <tr>

                    <th>Title</th>

                    <th>Author</th>

                    <th>Category</th>

                    <th>Status</th>

                    <th>Available</th>

                    <th></th>

                    <th></th>

                </tr>

            </thead>

            <tbody>

                {

                    books.map(book => (

                        <BookRow

                            key={book.bookId}

                            book={book}

                            onDelete={onDelete}

                        />

                    ))

                }

            </tbody>

        </table>

    );

}