import { certifications } from "../data/certifications";

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificatesModal({ isOpen, onClose }: CertificatesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-[#061c30] text-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative border border-[#1387f1]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#1387f1] hover:text-white transition text-3xl sm:text-2xl p-1 sm:p-0 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1387f1]"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#4da5d2]"></h3>
        <ul className="list-disc list-inside space-y-2 text-[#dbd6d3] text-xs sm:text-sm text-left">
          {certifications.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
          <br></br>
        </ul>
      </div>
    </div>
  );
}
