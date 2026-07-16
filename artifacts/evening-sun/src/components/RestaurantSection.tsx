import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Dummy data for Restaurant
const menuItems = [
  // Nigerian Meals
  { id: 'r1', name: 'Jollof Rice', price: 2500, description: 'Classic smoky party jollof rice served with plantain.', image: new URL('@assets/pexels-saizstudio-17952748_1784197343058.jpg', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'r2', name: 'Fried Rice', price: 2500, description: 'Rich Nigerian fried rice packed with vegetables and liver.', image: new URL('@assets/images_(1)_1784197343029.jpeg', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'r3', name: 'Egusi Soup', price: 2000, description: 'Rich melon seed soup cooked with assorted meat.', image: new URL('@assets/WhatsApp-Image-2025-01-08-at-08.19.23_707dbada-e1736323921927-_1784197343007.jpg', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'r4', name: 'Pounded Yam', price: 1500, description: 'Smooth, hot pounded yam. Perfect with any soup.', image: 'https://images.unsplash.com/photo-1623961990059-28356e226a77?w=800&q=80', category: 'Nigerian Meals' },
  { id: 'r5', name: 'Peppered Chicken', price: 3500, description: 'Spicy, flavorful peppered chicken portions.', image: new URL('@assets/download_1784197342397.jpeg', import.meta.url).href, category: 'Nigerian Meals' },
  
  // Shawarma & Burgers
  { id: 's1', name: 'Chicken Shawarma', price: 2500, description: 'Juicy chicken, sausages, cabbage, and our signature sauce.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', category: 'Shawarma' },
  { id: 's2', name: 'XXL Mixed Shawarma', price: 4000, description: 'Beef, chicken, double sausage, fully loaded.', image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=800&q=80', category: 'Shawarma' },
  { id: 'b1', name: 'Double Smash Burger', price: 5000, description: 'Two smashed beef patties, melted cheese, signature sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', category: 'Burgers' },
  
  // Pizza
  { id: 'p1', name: 'BBQ Chicken Pizza', price: 6500, description: 'BBQ sauce, grilled chicken, red onions, mozzarella.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', category: 'Pizza' },
  { id: 'p2', name: 'Meat Feast', price: 7000, description: 'Pepperoni, beef, chicken, sausages on a rich tomato base.', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80', category: 'Pizza' },
  
  // More Nigerian Meals
  { id: 'bp1', name: 'Beans & Plantain', price: 1800, description: 'Slow-cooked Nigerian honey beans served alongside sweet fried plantain.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', category: 'Nigerian Meals' },
  { id: 'mm1', name: 'Moi Moi', price: 800, description: 'Steamed bean pudding made with peppers, onions, and spices. Soft and flavourful.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', category: 'Nigerian Meals' },
  { id: 'ef1', name: 'Efo Riro & Semovita', price: 2500, description: 'Yoruba-style leafy vegetable soup cooked with assorted meat, served with smooth semovita.', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', category: 'Nigerian Meals' },
  { id: 'og1', name: 'Ogbono & Pounded Yam', price: 2800, description: 'Draw soup made from ground ogbono seeds with assorted meat, paired with silky pounded yam.', image: 'https://images.unsplash.com/photo-1623961990059-28356e226a77?w=800&q=80', category: 'Nigerian Meals' },

  // Small Chops & Drinks
  { id: 'sc1', name: 'Small Chops Pack', price: 2500, description: 'Spring rolls, samosas, puff puff, and peppered meat.', image: 'https://images.unsplash.com/photo-1626804475297-41609ea064eb?w=800&q=80', category: 'Small Chops' },
  { id: 'd1', name: 'Chapman', price: 1200, description: 'Classic Nigerian mocktail with a hint of Angostura bitters.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80', category: 'Drinks' },
];

const categories = ['All', 'Nigerian Meals', 'Shawarma', 'Burgers', 'Pizza', 'Small Chops', 'Drinks'];

export function RestaurantSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="restaurant" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Restaurant</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Experience the rich, authentic flavors of Nigeria paired with intercontinental favorites, prepared fresh daily by our expert chefs.
          </p>
        </div>

        <div className="mb-10 w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex w-max space-x-2 p-1 mx-auto justify-center min-w-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
