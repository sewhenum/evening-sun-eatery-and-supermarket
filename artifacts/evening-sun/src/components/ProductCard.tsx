import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    setIsAdding(true);
    addToCart({ ...product, quantity });
    
    // Reset after animation
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background shadow-sm text-foreground transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background shadow-sm text-foreground transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          
          <Button 
            onClick={handleAdd}
            size="sm"
            className={`rounded-full relative overflow-hidden transition-all ${isAdding ? 'bg-green-500 hover:bg-green-600 w-10 px-0' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="adding"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium px-2"
                >
                  Add
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
