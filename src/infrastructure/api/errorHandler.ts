import { AxiosError } from "axios";

import { ApiError } from "@/shared/errors/ApiError";

export function handleApiError(error:unknown){

    if(error instanceof AxiosError){

        throw new ApiError(

            error.response?.status??500,

            error.response?.data?.message??

            "Unexpected Error"

        );

    }

    throw error;

}