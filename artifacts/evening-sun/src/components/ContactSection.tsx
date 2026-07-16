import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_PHONE, ALT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Info */}
          <div className="lg:w-1/2 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Visit Us</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                We're always ready to welcome you. Drop by for a meal, a drink, or just to say hi.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Evening Sun Eatery & Supermarket Complex<br />
                    [Insert Street Address],<br />
                    [Insert City], Nigeria.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                  <p className="text-muted-foreground">Mon - Sat: 8:00 AM - 11:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 10:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Contact Numbers</h4>
                  <p className="text-muted-foreground">
                    <a href={`tel:+${CONTACT_PHONE}`} className="hover:text-primary transition-colors">0808 173 4021</a>
                    <span className="mx-2">|</span>
                    <a href={`tel:+${ALT_PHONE}`} className="hover:text-primary transition-colors">0813 148 0059</a>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <a 
                      href={generateWhatsAppLink(CONTACT_PHONE, "Hi Evening Sun!")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 hover:underline font-medium"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Chat with us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/evensuneatry" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Map/Image Placeholder */}
          <div className="lg:w-1/2 h-[500px] lg:h-auto min-h-[500px] rounded-3xl overflow-hidden bg-muted relative border border-border">
            {/* If Google Maps embed is provided later, replace this image */}
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant exterior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white w-full">
                <h3 className="font-display font-bold text-2xl mb-2">We are here</h3>
                <p>Come experience the magic in person.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
