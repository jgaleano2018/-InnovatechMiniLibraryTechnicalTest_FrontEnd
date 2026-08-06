import axios from "axios";

export const httpClient = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json"

    }

});

httpClient.interceptors.request.use(

(config)=>{

    if(typeof window!=="undefined"){

        const token=localStorage.getItem("token");

        if(token){

            config.headers.Authorization=`Bearer ${token}`;

        }

    }

    return config;

});