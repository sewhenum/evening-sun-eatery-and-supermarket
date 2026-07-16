import { useState } from "react";
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
import { PrivacyPolicyPage } from "@/components/PrivacyPolicyPage";
import { TermsConditionsPage } from "@/components/TermsConditionsPage";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type Page = 'home' | 'privacy' | 'terms';

function App() {
  const [page, setPage] = useState<Page>('home');

  const goHome = () => {
    setPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="evening-sun-theme">
      <CartProvider>
        <TooltipProvider>
          {page === 'privacy' ? (
            <PrivacyPolicyPage onClose={goHome} />
          ) : page === 'terms' ? (
            <TermsConditionsPage onClose={goHome} />
          ) : (
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

              <Footer onPrivacy={() => setPage('privacy')} onTerms={() => setPage('terms')} />
              <CartDrawer />
              <FloatingWhatsApp />
            </div>
          )}
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
