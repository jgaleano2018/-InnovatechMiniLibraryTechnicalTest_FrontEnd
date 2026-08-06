"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {

    loginSchema,

    LoginFormData

} from "@/shared/validations/loginSchema";

import { useLogin } from "@/presentation/hooks/useLogin";

export default function LoginForm() {

    const { login } = useLogin();

    const [loading, setLoading] = useState(false);

    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useForm<LoginFormData>({

        resolver: zodResolver(loginSchema)

    });

    async function onSubmit(data: LoginFormData) {

        try {

            setLoading(true);

            await login(data);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white shadow-lg rounded-xl p-10 w-[450px]">

                <h1 className="text-3xl font-bold mb-8">

                    Library Login

                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>

                        <label>Email</label>

                        <input

                            {...register("email")}

                            className="border rounded p-2 w-full"

                        />

                        <p className="text-red-500">

                            {errors.email?.message}

                        </p>

                    </div>

                    <div>

                        <label>First Name</label>

                        <input

                            {...register("firstName")}

                            className="border rounded p-2 w-full"

                        />

                    </div>

                    <div>

                        <label>Last Name</label>

                        <input

                            {...register("lastName")}

                            className="border rounded p-2 w-full"

                        />

                    </div>

                    <div>

                        <label>Provider</label>

                        <select

                            {...register("providerName")}

                            className="border rounded p-2 w-full"

                        >

                            <option value="">

                                Select

                            </option>

                            <option value="AzureAD">

                                Azure AD

                            </option>

                            <option value="Google">

                                Google

                            </option>

                        </select>

                    </div>

                    <div>

                        <label>SSO Identifier</label>

                        <input

                            {...register("ssoUserIdentifier")}

                            className="border rounded p-2 w-full"

                        />

                    </div>

                    <button

                        disabled={loading}

                        className="bg-blue-600 text-white rounded w-full p-3"

                    >

                        {

                            loading

                            ?

                            "Loading..."

                            :

                            "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}