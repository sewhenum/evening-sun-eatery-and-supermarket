import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { ProductCard } from './ProductCard';

const grillItems = [
  { id: 'g1', name: 'Grilled Turkey', price: 6000, description: 'Spicy, tender, and intensely flavorful grilled turkey wings.', image: new URL('@assets/images_(20)_1784202019464.jpeg', import.meta.url).href, category: 'Poultry' },
  { id: 'g2', name: 'Asun (Spicy Goat Meat)', price: 4500, description: 'Smoky, incredibly spicy chopped roasted goat meat.', image: new URL('@assets/images_(9)_1784202019485.jpeg', import.meta.url).href, category: 'Meat' },
  { id: 'g3', name: 'Beef Suya (Wrap)', price: 2000, description: 'Authentic Hausa spiced grilled beef with onions, cabbage and tomatoes.', image: new URL('@assets/images_(22)_1784202019503.jpeg', import.meta.url).href, category: 'Suya' },
  { id: 'g4', name: 'Grilled Croaker Fish', price: 6500, description: 'Whole grilled croaker, marinated in special peppers, served with plantain.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&q=80', category: 'Seafood' },
];

export function GrillSection() {
  return (
    <section id="grill" className="py-24 relative overflow-hidden bg-zinc-950 text-white">
      {/* Dark/Fire themed background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1505018620898-92616e48ff6b?q=80&w=2000&auto=format&fit=crop" 
          alt="Fire background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <Flame className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">The Grill Spot</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Where fire meets flavor. The city's finest smoky delicacies, from authentic Suya to premium Asun and expertly grilled fish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grillItems.map((item) => (
            <div key={item.id} className="dark">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
