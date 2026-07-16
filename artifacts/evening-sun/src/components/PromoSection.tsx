import { ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function PromoSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Tag className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
                Family Combo Special
              </h3>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-xl">
                Get 15% off when you order 4 or more main dishes. Plus, free delivery on all orders above ₦20,000!
              </p>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 md:mt-0 shrink-0">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-8 text-lg font-bold shadow-lg gap-2"
              onClick={() => document.getElementById('restaurant')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
