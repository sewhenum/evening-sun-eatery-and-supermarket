import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const supermarketItems = [
  // Groceries
  { id: 'sm1', name: 'Golden Penny Pasta 500g', price: 600, description: 'Premium quality spaghetti.', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80', category: 'Groceries' },
  { id: 'sm2', name: 'Kings Vegetable Oil 3L', price: 6500, description: 'Pure cholesterol-free vegetable oil.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80', category: 'Groceries' },
  { id: 'sm3', name: 'Titus Sardine 125g', price: 800, description: 'Premium canned sardines in oil.', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80', category: 'Groceries' },
  
  // Beverages
  { id: 'sm4', name: 'Milo Refill 500g', price: 2500, description: 'Nestle Milo cocoa powder refill pack.', image: 'https://images.unsplash.com/photo-1517488629431-6427e02d7280?w=800&q=80', category: 'Beverages' },
  { id: 'sm5', name: 'Peak Milk Refill 380g', price: 2800, description: 'Rich and creamy powdered milk.', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80', category: 'Beverages' },
  { id: 'sm6', name: 'Chivita 100% Orange 1L', price: 1200, description: 'Pure orange juice with no added sugar.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451b02?w=800&q=80', category: 'Beverages' },

  // Snacks
  { id: 'sm7', name: 'Pringles Original', price: 2000, description: 'Classic salted potato crisps.', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd08c?w=800&q=80', category: 'Snacks' },
  { id: 'sm8', name: 'Oreo Original', price: 1500, description: 'Chocolate sandwich cookies with vanilla cream.', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', category: 'Snacks' },
  
  // Toiletries
  { id: 'sm9', name: 'Dettol Soap (Pack of 6)', price: 3000, description: 'Original antibacterial bathing soap.', image: 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?w=800&q=80', category: 'Toiletries' },
  { id: 'sm10', name: 'Oral-B Toothpaste 140g', price: 1000, description: 'Pro-Expert all around protection.', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&q=80', category: 'Toiletries' },
];

const categories = ['All', 'Groceries', 'Beverages', 'Snacks', 'Toiletries', 'Household', 'Frozen Foods'];

export function SupermarketSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? supermarketItems 
    : supermarketItems.filter(item => item.category === activeCategory);

  return (
    <section id="supermarket" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-500">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Supermarket</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Shop for your daily essentials, fresh groceries, and premium household items all in one place. Add to your cart and have it delivered with your meal!
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
                      ? 'bg-emerald-500 text-white shadow-md'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              More items in this category coming soon! Shop in-store for our full selection.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
