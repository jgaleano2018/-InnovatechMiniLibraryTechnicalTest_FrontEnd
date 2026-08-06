import { BookResponse } from "@/application/dto/books/BookResponse";

interface Props {
    book: BookResponse;
    onEdit?: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function BookRow({
    book,
    onEdit,
    onDelete
}: Props) {
    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            <td className="py-2 px-4">{book.title}</td>
            <td className="py-2 px-4">{book.authorId}</td>
            <td className="py-2 px-4">{book.category}</td>
            <td className="py-2 px-4">{book.status}</td>
            <td className="py-2 px-4">{book.availableCopies}</td>
            
            {/* Botón de Edición */}
            <td className="py-2 px-4">
                <button
                    type="button"
                    onClick={() => onEdit && onEdit(book.bookId)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    Edit
                </button>
            </td>

            {/* Botón de Eliminación */}
            <td className="py-2 px-4">
                <button
                    type="button"
                    onClick={() => onDelete(book.bookId)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}