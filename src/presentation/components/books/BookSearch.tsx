"use client";

interface Props {

    value: string;

    onChange(value: string): void;

}

export default function BookSearch({

    value,

    onChange

}: Props) {

    return (

        <input

            className="border rounded-lg p-3 w-full"

            placeholder="Search books..."

            value={value}

            onChange={(e) =>

                onChange(e.target.value)

            }

        />

    );

}