import BookRow from "./BookRow";
import { BookResponse } from "@/application/dto/books/BookResponse";

interface Props {
    books: BookResponse[];
    onEdit?: (id: number) => void; // Agregamos la prop de edición
    onDelete: (id: number) => void;
}

export default function BookTable({
    books,
    onEdit,
    onDelete
}: Props) {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Author</th>
                    <th className="text-left py-2 px-4">Category</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Available</th>
                    <th className="py-2 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <BookRow
                        key={book.bookId}
                        book={book}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}