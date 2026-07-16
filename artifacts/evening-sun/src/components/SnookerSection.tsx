import { Gamepad2, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';

export function SnookerSection() {
  const packages = [
    { name: 'Hourly Rate', price: '₦1,500/hr', desc: 'Standard play per hour per table', icon: Clock },
    { name: 'Tournament Entry', price: '₦5,000', desc: 'Join our weekly Friday tournaments', icon: Trophy },
    { name: 'Group Package', price: '₦12,000', desc: '4 people, 3hrs play + 4 drinks', icon: Gamepad2 },
  ];

  return (
    <section id="snooker" className="py-24 bg-[#111] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Snooker Arena</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Professional championship tables, cold drinks, and a great crowd. Whether you're a seasoned pro or just playing for fun.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden h-[400px] lg:h-[500px]">
            <img 
              src={new URL('@assets/images_(23)_1784202019547.jpeg', import.meta.url).href}
              alt="Snooker Arena" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Play Packages</h3>
            
            <div className="space-y-4">
              {packages.map((pkg, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <pkg.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{pkg.name}</h4>
                    <p className="text-sm text-gray-400">{pkg.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xl text-blue-400">{pkg.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg mt-4"
              onClick={() => window.open(generateWhatsAppLink(CONTACT_PHONE, "Hi, I want to book a snooker table."), '_blank')}
            >
              Book a Table via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
