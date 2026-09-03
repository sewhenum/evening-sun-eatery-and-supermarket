import { lazy, Suspense, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RestaurantSection } from "@/components/RestaurantSection";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { DeferredSection } from "@/components/DeferredSection";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type Page = 'home' | 'privacy' | 'terms';

const BakerySection = lazy(() =>
  import("@/components/BakerySection").then(({ BakerySection }) => ({
    default: BakerySection,
  })),
);
const GrillSection = lazy(() =>
  import("@/components/GrillSection").then(({ GrillSection }) => ({
    default: GrillSection,
  })),
);
const LoungeSection = lazy(() =>
  import("@/components/LoungeSection").then(({ LoungeSection }) => ({
    default: LoungeSection,
  })),
);
const SnookerSection = lazy(() =>
  import("@/components/SnookerSection").then(({ SnookerSection }) => ({
    default: SnookerSection,
  })),
);
const SalonSection = lazy(() =>
  import("@/components/SalonSection").then(({ SalonSection }) => ({
    default: SalonSection,
  })),
);
const SupermarketSection = lazy(() =>
  import("@/components/SupermarketSection").then(({ SupermarketSection }) => ({
    default: SupermarketSection,
  })),
);
const PromoSection = lazy(() =>
  import("@/components/PromoSection").then(({ PromoSection }) => ({
    default: PromoSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then(({ TestimonialsSection }) => ({
    default: TestimonialsSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then(({ ContactSection }) => ({
    default: ContactSection,
  })),
);
const Footer = lazy(() =>
  import("@/components/Footer").then(({ Footer }) => ({
    default: Footer,
  })),
);
const PrivacyPolicyPage = lazy(() =>
  import("@/components/PrivacyPolicyPage").then(({ PrivacyPolicyPage }) => ({
    default: PrivacyPolicyPage,
  })),
);
const TermsConditionsPage = lazy(() =>
  import("@/components/TermsConditionsPage").then(({ TermsConditionsPage }) => ({
    default: TermsConditionsPage,
  })),
);

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
            <Suspense fallback={null}>
              <PrivacyPolicyPage onClose={goHome} />
            </Suspense>
          ) : page === 'terms' ? (
            <Suspense fallback={null}>
              <TermsConditionsPage onClose={goHome} />
            </Suspense>
          ) : (
            <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
              <Navbar />

              <main>
                <Hero />
                <RestaurantSection />
                <DeferredSection id="bakery" component={BakerySection} />
                <DeferredSection id="grill" component={GrillSection} />
                <DeferredSection id="lounge" component={LoungeSection} />
                <DeferredSection id="snooker" component={SnookerSection} />
                <DeferredSection id="salon" component={SalonSection} />
                <DeferredSection id="supermarket" component={SupermarketSection} />
                <DeferredSection id="promos" component={PromoSection} />
                <DeferredSection id="testimonials" component={TestimonialsSection} />
                <DeferredSection id="contact" component={ContactSection} />
              </main>

              <Suspense fallback={null}>
                <Footer onPrivacy={() => setPage('privacy')} onTerms={() => setPage('terms')} />
              </Suspense>
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
