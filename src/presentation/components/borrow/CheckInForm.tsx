"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkInSchema, CheckInFormData } from "@/shared/validations/checkInSchema";

interface Props {
  loading: boolean;
  onSubmit(values: CheckInFormData): Promise<void>;
}

export default function CheckInForm({ loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema)
  });

  return (
    <form
      onSubmit={handleSubmit(
        (data) => onSubmit(data),
        (err) => console.log("Errores de formulario:", err) // Muestra errores en consola si no envía
      )}
      className="space-y-6 bg-white p-8 rounded-xl shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Borrow Id
        </label>
        <input
          type="number"
          className="w-full border rounded p-3 mt-1"
          {...register("borrowId", { valueAsNumber: true })}
        />
        {errors.borrowId && (
          <p className="text-red-500 text-sm mt-1">{errors.borrowId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 text-white rounded p-3 w-full disabled:opacity-50"
      >
        {loading ? "Returning..." : "Confirmar Préstamo"}
      </button>
    </form>
  );
}