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

  { id: 'r5', name: 'Peppered Chicken', price: 3500, description: 'Spicy, flavorful peppered chicken portions.', image: new URL('@assets/download_1784197342397.jpeg', import.meta.url).href, category: 'Nigerian Meals' },
  
  // Shawarma & Burgers
  { id: 's1', name: 'Chicken Shawarma', price: 2500, description: 'Juicy chicken, sausages, cabbage, and our signature sauce.', image: new URL('@assets/D20FA594-9EDC-4D79-AC45-38221B9E5A98-768x1152_1784199966930.jpeg', import.meta.url).href, category: 'Shawarma' },
  { id: 's3', name: 'Beef Shawarma', price: 2800, description: 'Tender spiced beef strips, fresh vegetables, and garlic sauce wrapped in soft flatbread.', image: new URL('@assets/1_zB3NS1z3MXPR77mBfYXAPg_1784199966953.webp', import.meta.url).href, category: 'Shawarma' },
  { id: 's2', name: 'XXL Mixed Shawarma', price: 4000, description: 'Beef, chicken, double sausage, fully loaded.', image: new URL('@assets/4F6AF10C-0EBB-476A-BECB-BCA0A64B613E-768x1152_1784199966974.jpeg', import.meta.url).href, category: 'Shawarma' },
  { id: 'b1', name: 'Double Smash Burger', price: 5000, description: 'Two smashed beef patties, melted cheese, signature sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80', category: 'Burgers' },
  { id: 'b2', name: 'Cheese Burger', price: 4500, description: 'Juicy beef patty loaded with melted cheddar, lettuce, tomato, and our special burger sauce.', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1200&q=80', category: 'Burgers' },
  { id: 'b3', name: 'Chicken Burger', price: 4000, description: 'Crispy fried or grilled chicken fillet with coleslaw, pickles, and mayo in a toasted bun.', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80', category: 'Burgers' },
  
  // Pizza
  { id: 'p1', name: 'BBQ Chicken Pizza', price: 6500, description: 'BBQ sauce, grilled chicken, red onions, mozzarella.', image: new URL('@assets/images_(20)_1784199966995.jpeg', import.meta.url).href, category: 'Pizza' },
  { id: 'p2', name: 'Meat Feast', price: 7000, description: 'Pepperoni, beef, chicken, sausages on a rich tomato base.', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80', category: 'Pizza' },
  
  { id: 'r6', name: 'Coconut Rice', price: 3000, description: 'Fragrant rice cooked in rich coconut milk with spices and assorted protein.', image: new URL('@assets/images_(3)_1784199966045.jpeg', import.meta.url).href, category: 'Nigerian Meals' },

  // More Nigerian Meals
  { id: 'bp1', name: 'Beans & Plantain', price: 1800, description: 'Slow-cooked Nigerian honey beans served alongside sweet fried plantain.', image: new URL('@assets/images_1784199104801.jpeg', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'mm1', name: 'Moi Moi', price: 800, description: 'Steamed bean pudding made with peppers, onions, and spices. Soft and flavourful.', image: new URL('@assets/savingpng-19_1784199104886.webp', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'ef1', name: 'Efo Riro & Semovita', price: 2500, description: 'Yoruba-style leafy vegetable soup cooked with assorted meat, served with smooth semovita.', image: new URL('@assets/images_(15)_1784199104952.jpeg', import.meta.url).href, category: 'Nigerian Meals' },
  { id: 'og1', name: 'Ogbono & Pounded Yam', price: 2800, description: 'Draw soup made from ground ogbono seeds with assorted meat, paired with silky pounded yam.', image: new URL('@assets/images_(12)_1784199104918.jpeg', import.meta.url).href, category: 'Nigerian Meals' },

  // Small Chops & Drinks
  { id: 'sc1', name: 'Small Chops Pack', price: 2500, description: 'Spring rolls, samosas, puff puff, and peppered meat.', image: new URL('@assets/1_ZSbWn7G0xQhQagcEzh424Q_1784199967016.webp', import.meta.url).href, category: 'Small Chops' },
  { id: 'd1', name: 'Chapman', price: 1200, description: 'Classic Nigerian mocktail with a hint of Angostura bitters.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80', category: 'Drinks' },
  { id: 'd2', name: 'Soft Drinks', price: 500, description: 'Chilled Coke, Fanta, Sprite, Pepsi, and more — pick your favourite fizzy refresher.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80', category: 'Drinks' },
  { id: 'd3', name: 'Fruit Smoothie', price: 1500, description: 'Freshly blended seasonal fruits — mango, strawberry, banana, or mixed berry. Rich and chilled.', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80', category: 'Drinks' },
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
