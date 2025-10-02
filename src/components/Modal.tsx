import { useEffect, type ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Modal({ open, onClose, children, title }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto px-4 py-8 sm:px-6"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="card relative z-10 w-full max-w-2xl bg-white p-4 sm:p-6 rounded shadow-md animate-fade-in">
        {title && (
          <h3 id="modal-title" className="mb-4 text-lg sm:text-xl font-bold text-gray-800">
            {title}
          </h3>
        )}

        {/* Modal Body */}
        <div className="text-sm sm:text-base text-gray-700">
          {children}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-outline mt-6 w-full sm:w-auto sm:ml-auto sm:block"
        >
          Close
        </button>
      </div>
    </div>
  );
}
