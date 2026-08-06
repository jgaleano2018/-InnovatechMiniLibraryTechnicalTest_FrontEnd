"use client";

interface Props{

    error:Error;

    reset():void;

}

export default function Error({

    error,

    reset

}:Props){

    return(

        <main className="p-10">

            <h1>

                Unexpected Error

            </h1>

            <p>

                {error.message}

            </p>

            <button

                onClick={reset}

            >

                Try Again

            </button>

        </main>

    );

}