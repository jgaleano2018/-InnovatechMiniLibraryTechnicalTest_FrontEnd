'use client';

import { useState } from 'react';

// Si tus componentes de CheckIn y CheckOut ya existen en otras rutas, 
// puedes mover su lógica a componentes o importarlos directamente aquí.
// Ejemplo: import CheckInForm from '@/components/borrow/CheckInForm';

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

      {/* Contenido Dinámico según la Pestaña Seleccionada */}
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Sustituye con el llamado a tu API / backend real
      // const res = await fetch('/api/borrow/checkout', { method: 'POST', body: JSON.stringify({ userId, bookId, dueDate }) });
      
      // Simulación de respuesta exitosa:
      await new Promise((res) => setTimeout(res, 1000));
      setMessage({ type: 'success', text: '¡Préstamo registrado exitosamente!' });
      setUserId('');
      setBookId('');
      setDueDate('');
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al procesar el préstamo. Verifica los datos.' });
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
            type="text"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ej: USR-1029"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ID o Código del Libro
          </label>
          <input
            type="text"
            required
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="Ej: BOK-5541"
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
  const [borrowIdOrBookId, setBorrowIdOrBookId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Sustituye con el llamado a tu API / backend real
      // const res = await fetch('/api/borrow/checkin', { method: 'POST', body: JSON.stringify({ borrowIdOrBookId }) });

      // Simulación de respuesta exitosa:
      await new Promise((res) => setTimeout(res, 1000));
      setMessage({ type: 'success', text: '¡Devolución registrada e inventario actualizado!' });
      setBorrowIdOrBookId('');
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al procesar la devolución.' });
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
            Código de Préstamo o ID del Libro
          </label>
          <input
            type="text"
            required
            value={borrowIdOrBookId}
            onChange={(e) => setBorrowIdOrBookId(e.target.value)}
            placeholder="Ej: BOK-5541 o ID de Préstamo"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Registrar Devolución'}
        </button>
      </form>
    </div>
  );
}