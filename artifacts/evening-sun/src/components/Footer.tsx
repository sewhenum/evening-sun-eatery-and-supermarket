import { CONTACT_PHONE, ALT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
                ES
              </div>
              <div className="font-display font-bold text-2xl leading-tight text-white">
                Evening Sun
                <span className="block text-xs font-sans font-normal text-primary tracking-widest uppercase">Eatery & Supermarket</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your premium destination for exceptional dining, lifestyle experiences, and everyday essentials in one luxurious location.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/evensuneatry" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={generateWhatsAppLink(CONTACT_PHONE, "Hi!")} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3">
              {['Restaurant', 'Bakery', 'Grill Spot', 'Lounge', 'Snooker Arena', 'Salon', 'Supermarket'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400">Evening Sun Complex,<br />Nigeria.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col text-gray-400">
                  <a href={`tel:+${CONTACT_PHONE}`} className="hover:text-primary">0808 173 4021</a>
                  <a href={`tel:+${ALT_PHONE}`} className="hover:text-primary">0813 148 0059</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to get special offers, free giveaways, and updates.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-3 font-bold transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Evening Sun Eatery & Supermarket. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
