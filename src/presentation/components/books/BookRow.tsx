import { BookResponse } from "@/application/dto/books/BookResponse";

interface Props {

    book: BookResponse;

    onDelete(id: number): void;

}

export default function BookRow({

    book,

    onDelete

}: Props) {

    return (

        <tr>

            <td>{book.title}</td>

            <td>{book.authorId}</td>

            <td>{book.category}</td>

            <td>{book.status}</td>

            <td>{book.availableCopies}</td>

            <td>

                <button>

                    Edit

                </button>

            </td>

            <td>

                <button

                    onClick={() =>

                        onDelete(book.bookId)

                    }

                >

                    Delete

                </button>

            </td>

        </tr>

    );

}