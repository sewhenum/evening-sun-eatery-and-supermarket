import { useEffect, useState } from 'react';
import { Menu, X, ShoppingCart, Moon, Sun, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Restaurant', href: '#restaurant' },
    { name: 'Bakery', href: '#bakery' },
    { name: 'Grill', href: '#grill' },
    { name: 'Lounge', href: '#lounge' },
    { name: 'Snooker', href: '#snooker' },
    { name: 'Salon', href: '#salon' },
    { name: 'Supermarket', href: '#supermarket' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl shadow-lg">
            ES
          </div>
          <div className={`hidden md:block font-display font-bold text-xl leading-tight ${isScrolled ? 'text-foreground' : 'text-white drop-shadow-md'}`}>
            Evening Sun
            <span className="block text-xs font-sans font-normal opacity-80 tracking-widest uppercase">Eatery & Supermarket</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-foreground/80' : 'text-white/90 hover:text-white drop-shadow-sm'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`rounded-full ${isScrolled ? 'text-foreground' : 'text-white hover:text-white hover:bg-white/20'}`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className={`relative rounded-full ${isScrolled ? 'text-foreground' : 'text-white hover:text-white hover:bg-white/20'}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            onClick={() => setIsCartOpen(true)}
          >
            Order Now
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden rounded-full ${isScrolled ? 'text-foreground' : 'text-white hover:bg-white/20'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b shadow-xl p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-left text-lg font-medium p-2 hover:text-primary transition-colors border-b border-border/50"
            >
              {link.name}
            </button>
          ))}
          <Button className="w-full mt-2 rounded-full" onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCartOpen(true);
          }}>
            Order Now
          </Button>
        </div>
      )}
    </header>
  );
}
