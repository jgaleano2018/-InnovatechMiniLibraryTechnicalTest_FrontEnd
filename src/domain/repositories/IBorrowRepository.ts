import { CheckInRequest } from "@/application/dto/borrow/CheckInRequest";
import { CheckOutRequest } from "@/application/dto/borrow/CheckOutRequest";

// Interfaz para la respuesta de la consulta del préstamo activo
export interface BorrowResponse {
    id?: number;
    borrowId?: number;
    [key: string]: any;
}

export interface IBorrowRepository {
    /**
     * Obtiene la información del préstamo activo mediante el ID del libro.
     */
    getByBookId(bookId: number): Promise<BorrowResponse>;

    /**
     * Registra la devolución de un libro.
     */
    checkIn(request: CheckInRequest): Promise<void>;

    /**
     * Registra el préstamo de un libro.
     */
    checkOut(request: CheckOutRequest): Promise<void>;
}