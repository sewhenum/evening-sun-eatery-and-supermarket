import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop', // Grilled meat
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop', // Fresh food bowl
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2000&auto=format&fit=crop', // Nigerian food vibe
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop', // Bakery bread
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop', // Cocktails/Lounge
];

export function Hero() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background Slider */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 h-[120%] -top-[10%]">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((src, index) => (
              <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img
                  src={src}
                  alt={`Evening Sun ambiance ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
            The destination in your city
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl"
        >
          Taste Excellence. <br />
          <span className="text-primary italic">Experience Comfort.</span> <br />
          Create Memories.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-medium drop-shadow-md"
        >
          Welcome to Evening Sun Eatery & Supermarket – where every meal is prepared with passion, every bite creates memories, and every visit feels like home.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="rounded-full h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
            onClick={() => document.getElementById('restaurant')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Order Now
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full h-14 px-8 text-lg bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md transition-all hover:scale-105 gap-2"
            onClick={() => window.open(generateWhatsAppLink(CONTACT_PHONE, "Hi Evening Sun, I would like to make an inquiry."), '_blank')}
          >
            <FaWhatsapp className="w-5 h-5 text-green-400" />
            Chat on WhatsApp
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
