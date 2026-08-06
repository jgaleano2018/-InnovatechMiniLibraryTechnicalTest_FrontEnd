import { handleApiError } from "../api/errorHandler";

export abstract class BaseRepository {

    protected async execute<T>(
        callback: () => Promise<T>
    ): Promise<T> {

        try {
            return await callback();
        } catch (error) {
            handleApiError(error);
            throw error; // Nunca se ejecutará si handleApiError lanza la excepción.
        }

    }

}