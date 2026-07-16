import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RestaurantSection } from "@/components/RestaurantSection";
import { BakerySection } from "@/components/BakerySection";
import { GrillSection } from "@/components/GrillSection";
import { LoungeSection } from "@/components/LoungeSection";
import { SnookerSection } from "@/components/SnookerSection";
import { SalonSection } from "@/components/SalonSection";
import { SupermarketSection } from "@/components/SupermarketSection";
import { PromoSection } from "@/components/PromoSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="evening-sun-theme">
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
            <Navbar />
            
            <main>
              <Hero />
              <RestaurantSection />
              <BakerySection />
              <GrillSection />
              <LoungeSection />
              <SnookerSection />
              <SalonSection />
              <SupermarketSection />
              <PromoSection />
              <TestimonialsSection />
              <ContactSection />
            </main>

            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
          </div>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
