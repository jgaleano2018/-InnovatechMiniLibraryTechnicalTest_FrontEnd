'use client';

import { useState } from 'react';
import { BorrowRepository } from '@/infrastructure/repositories/BorrowRepository';

// Instanciamos el repositorio
const borrowRepository = new BorrowRepository();

export default function BorrowPage() {
  const [activeTab, setActiveTab] = useState<'checkout' | 'checkin'>('checkout');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Encabezado Principal */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Gestión de Préstamos y Devoluciones
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Registra la salida (Check-out) de libros para usuarios o procesa la entrada (Check-in) de ejemplares devueltos.
        </p>
      </div>

      {/* Selector de Pestañas (Tabs) */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setActiveTab('checkout')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'checkout'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span>📖</span> Registrar Préstamo (Check-out)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checkin')}
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'checkin'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span>📥</span> Procesar Devolución (Check-in)
          </button>
        </nav>
      </div>

      {/* Contenido Dinámico */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
        {activeTab === 'checkout' ? (
          <CheckOutSection />
        ) : (
          <CheckInSection />
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   SECCIÓN DE CHECK-OUT (PRÉSTAMO DE LIBROS)
   ============================================================================ */
function CheckOutSection() {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [borrowerName, setBorrowerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 1. Consultar información previa del libro a través de BorrowRepository
      const borrowData = await borrowRepository.getByBookId(Number(bookId));
      
      const fetchedBorrowerName = borrowData?.borrowerName || null;
      setBorrowerName(fetchedBorrowerName);

      // 2. Realizar el Check-out mediante el repositorio
      await borrowRepository.checkOut({
        userId: Number(userId),
        bookId: Number(bookId),
        dueDate,
      });

      const successDetail = fetchedBorrowerName 
        ? `¡Préstamo registrado exitosamente para ${fetchedBorrowerName}!`
        : '¡Préstamo registrado exitosamente!';

      setMessage({ type: 'success', text: successDetail });
      
      // Limpiar formulario
      setUserId('');
      setBookId('');
      setDueDate('');
      setBorrowerName(null);
    } catch (err: any) {
      console.error("Error al procesar préstamo:", err);
      setMessage({ 
        type: 'error', 
        text: `Error al procesar el préstamo (${err.message || 'Error del servidor'}).` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Nuevo Préstamo de Libro
      </h2>

      {message && (
        <div
          className={`p-4 mb-4 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleCheckOut} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ID del Usuario
          </label>
          <input
            type="number"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ej: 1029"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ID del Libro
          </label>
          <input
            type="number"
            required
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Ej: 5541"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fecha Límite de Devolución
          </label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {borrowerName && (
          <div className="p-3 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded">
            Prestatario detectado: <strong>{borrowerName}</strong>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Confirmar Préstamo'}
        </button>
      </form>
    </div>
  );
}

/* ============================================================================
   SECCIÓN DE CHECK-IN (DEVOLUCIÓN DE LIBROS)
   ============================================================================ */
function CheckInSection() {
  const [bookId, setBookId] = useState('');
  const [borrowId, setBorrowId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 1. Consultar el préstamo activo mediante bookId
      const borrowData = await borrowRepository.getByBookId(Number(bookId));
      const fetchedBorrowId = borrowData.id || borrowData.borrowId;

      if (!fetchedBorrowId) {
        throw new Error("El ID de préstamo devuelto por la API no es válido.");
      }

      setBorrowId(fetchedBorrowId);

      // 2. Realizar el Check-in enviando el borrowId obtenido
      await borrowRepository.checkIn({ borrowId: Number(fetchedBorrowId) });

      setMessage({
        type: 'success',
        text: `¡Devolución del libro #${bookId} (Préstamo #${fetchedBorrowId}) registrada con éxito!`,
      });

      // Limpiar formulario
      setBookId('');
      setBorrowId(null);
    } catch (err: any) {
      console.error("Error en devolución:", err);
      setMessage({ type: 'error', text: err.message || 'Error al procesar la devolución.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Procesar Devolución de Libro
      </h2>

      {message && (
        <div
          className={`p-4 mb-4 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleCheckIn} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ID del Libro a Devolver
          </label>
          <input
            type="number"
            required
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Ej: 5541"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {borrowId && (
          <div className="p-3 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded">
            Préstamo detectado ID: <strong>#{borrowId}</strong>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Confirmar Devolución'}
        </button>
      </form>
    </div>
  );
}