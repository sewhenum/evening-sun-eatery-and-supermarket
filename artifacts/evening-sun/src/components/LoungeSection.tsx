import { Wine, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

export function LoungeSection() {
  const openWhatsApp = () => {
    window.open(generateWhatsAppLink(CONTACT_PHONE, "Hi, I'd like to reserve a table at the Lounge."), '_blank');
  };

  return (
    <section id="lounge" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Wine className="w-4 h-4" />
              <span>Premium Experience</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Unwind in <br />
              <span className="italic text-primary font-serif">Absolute Luxury</span>
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl">
              Elevate your evenings. Our exclusive lounge offers the perfect ambiance for intimate dates, business meetings, or celebrating life's wins. Enjoy signature cocktails, premium spirits, and live entertainment.
            </p>
            
            <ul className="space-y-4 my-8">
              {['Live Music & DJ Nights', 'Premium Cocktails & Mocktails', 'VIP Sections Available', 'Shisha & Fine Cigars'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={openWhatsApp}>
                <Calendar className="w-5 h-5" />
                Reserve a Table
              </Button>
              <Button size="lg" variant="outline" className="rounded-full gap-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30" onClick={openWhatsApp}>
                <FaWhatsapp className="w-5 h-5" />
                Inquire on WhatsApp
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 h-[600px]">
            <div className="col-span-1 h-full rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=100?q=80&w=800&auto=format&fit=cropw=1200?q=80&w=800&auto=format&fit=cropauto=format?q=80&w=800&auto=format&fit=cropfit=crop" 
                alt="Lounge cocktails" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
              <div className="row-span-1 rounded-3xl overflow-hidden">
                <img 
                  src={new URL('@assets/images_(27)_1784202019526.jpeg', import.meta.url).href}
                  alt="Lounge ambiance" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="row-span-1 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=100?q=80&w=800&auto=format&fit=cropw=1200?q=80&w=800&auto=format&fit=cropauto=format?q=80&w=800&auto=format&fit=cropfit=crop" 
                  alt="VIP Section" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
