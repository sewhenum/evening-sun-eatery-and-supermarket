import { motion } from 'framer-motion';
import { Croissant } from 'lucide-react';
import { ProductCard } from './ProductCard';

const bakeryItems = [
  { id: 'bk1', name: 'Fresh Butter Bread', price: 700, description: 'Soft, fluffy, and freshly baked butter bread.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80', category: 'Bread' },
  { id: 'bk2', name: 'Agege Bread', price: 500, description: 'Classic dense and stretchy Nigerian street bread.', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80', category: 'Bread' },
  { id: 'bk3', name: 'Meat Pie', price: 500, description: 'Rich, flaky pastry filled with minced meat and potatoes.', image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=800&q=80', category: 'Pastries' },
  { id: 'bk4', name: 'Chicken Pie', price: 600, description: 'Creamy chicken filling wrapped in a buttery crust.', image: 'https://images.unsplash.com/photo-1582285818956-6a56c0757755?w=800&q=80', category: 'Pastries' },
  { id: 'bk5', name: 'Sausage Roll', price: 300, description: 'Savory sausage wrapped in puff pastry.', image: 'https://images.unsplash.com/photo-1627308595186-b4844ce10e4a?w=800&q=80', category: 'Pastries' },
  { id: 'bk6', name: 'Glazed Doughnuts', price: 400, description: 'Soft, airy rings of joy with a sweet glaze.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', category: 'Sweet' },
  { id: 'bk7', name: 'Chocolate Muffins', price: 500, description: 'Double chocolate muffins loaded with chocolate chips.', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80', category: 'Sweet' },
  { id: 'bk8', name: 'Custom Cake (Deposit)', price: 15000, description: 'Deposit for birthday or wedding cakes. We will contact you.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', category: 'Cakes' },
];

export function BakerySection() {
  return (
    <section id="bakery" className="py-24 bg-[#Fdfbf7] dark:bg-[#1a1510]">
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
