import { Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

const services = [
  'Professional Haircut',
  'Hair Styling',
  'Braiding',
  'Hair Coloring',
  'Facial Treatment',
  'Manicure',
  'Pedicure',
  'Full Spa Treatment',
];

export function SalonSection() {
  return (
    <section id="salon" className="py-24 bg-[#FAF9F6] dark:bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop" 
                alt="Hair Styling" 
                className="rounded-t-full rounded-bl-full object-cover w-full h-[300px]"
              />
              <img 
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop" 
                alt="Barber" 
                className="rounded-b-full rounded-tr-full object-cover w-full h-[300px] mt-12"
              />
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="mb-8">
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 text-rose-500">
                <Scissors className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Unisex Salon & Spa</h2>
              <p className="text-muted-foreground text-lg">
                Look good, feel great. Our professional stylists and therapists provide premium grooming services in a relaxing environment.
              </p>
            </div>

            <div className="bg-background rounded-3xl p-8 shadow-sm border border-border/50">
              <h3 className="font-display font-bold text-2xl mb-6 border-b border-border pb-4">Our Services</h3>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border/30 border-dashed">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span className="font-medium text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-8 rounded-full h-12 bg-rose-500 hover:bg-rose-600 text-white gap-2"
                onClick={() => window.open(generateWhatsAppLink(CONTACT_PHONE, "Hi, I'd like to book an appointment at the Salon."), '_blank')}
              >
                <FaWhatsapp className="w-5 h-5" />
                Book Appointment
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
