import { CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

export function FloatingWhatsApp() {
  return (
    <a
      href={generateWhatsAppLink(CONTACT_PHONE, "Hi Evening Sun, I would like to make an inquiry.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-black text-white text-sm py-2 px-4 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg origin-right scale-95 group-hover:scale-100 font-medium">
        Chat with us
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-black" />
      </span>
    </a>
  );
}
