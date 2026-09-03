import { motion } from 'framer-motion';
import { Croissant } from 'lucide-react';
import { ProductCard } from './ProductCard';

const bakeryItems = [
  { id: 'bk1', name: 'Fresh Butter Bread', price: 700, description: 'Soft, fluffy, and freshly baked butter bread.', image: new URL('@assets/images_(17)_1784202018915.jpeg', import.meta.url).href, category: 'Bread' },
  { id: 'bk2', name: 'Evening Sun Special Bread', price: 500, description: 'Our signature dense and stretchy Nigerian bread, baked fresh daily.', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=1200&q=80', category: 'Bread' },
  { id: 'bk9', name: 'Milk Bread', price: 600, description: 'Pillowy soft bread enriched with creamy milk for a rich, tender crumb.', image: new URL('@assets/download_(3)_1784297799140.jpeg', import.meta.url).href, category: 'Bread' },
  { id: 'bk10', name: 'Sardine Bread', price: 700, description: 'Savory bread stuffed with a well-seasoned sardine filling — a Nigerian classic.', image: new URL('@assets/images_(41)_1784297799210.jpeg', import.meta.url).href, category: 'Bread' },
  { id: 'bk11', name: 'Coconut Bread', price: 650, description: 'Lightly sweetened bread baked with real coconut for a tropical, fragrant bite.', image: new URL('@assets/images_(44)_1784297799231.jpeg', import.meta.url).href, category: 'Bread' },
  { id: 'bk3', name: 'Meat Pie', price: 500, description: 'Rich, flaky pastry filled with minced meat and potatoes.', image: new URL('@assets/20220809-NigerianMeatpies-MaureenCelestine-hedenote-939cb7af9_1784202019388.webp', import.meta.url).href, category: 'Pastries' },
  { id: 'bk4', name: 'Chicken Pie', price: 600, description: 'Creamy chicken filling wrapped in a buttery crust.', image: new URL('@assets/D0E345FB-C8D1-4C40-BF2D-2CBC3E55C564-768x1152_1784202019427.jpeg', import.meta.url).href, category: 'Pastries' },
  { id: 'bk5', name: 'Sausage Roll', price: 300, description: 'Savory sausage wrapped in puff pastry.', image: new URL('@assets/images_(7)_1784202019446.jpeg', import.meta.url).href, category: 'Pastries' },
  { id: 'bk6', name: 'Glazed Doughnuts', price: 400, description: 'Soft, airy rings of joy with a sweet glaze.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80', category: 'Sweet' },
  { id: 'bk7', name: 'Chocolate Muffins', price: 500, description: 'Double chocolate muffins loaded with chocolate chips.', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=1200&q=80', category: 'Sweet' },
  { id: 'bk8', name: 'Custom Cake (Deposit)', price: 15000, description: 'Deposit for birthday or wedding cakes. We will contact you.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80', category: 'Cakes' },
];

export function BakerySection() {
  return (
    <section className="py-24 bg-[#Fdfbf7] dark:bg-[#1a1510]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-orange-500">
            <Croissant className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Bakery</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Wake up to the smell of fresh bread. From classic Nigerian staples to delicate pastries, baked fresh every morning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bakeryItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
