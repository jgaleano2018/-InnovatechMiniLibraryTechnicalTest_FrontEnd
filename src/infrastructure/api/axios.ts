import axios from "axios";

export const api = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL,

    timeout:Number(process.env.NEXT_PUBLIC_TIMEOUT),

    headers:{

        "Content-Type":"application/json"

    }

});