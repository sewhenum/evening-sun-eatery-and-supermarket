import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    name: 'Chioma Adebayo',
    text: "The best Jollof rice I've had in a long time! The ambiance is beautiful and the customer service is top-notch.",
    role: 'Regular Customer'
  },
  {
    name: 'Oluwaseun O.',
    text: "I come here every Friday for the snooker tournament and stay for the grilled fish. It's the perfect way to start the weekend.",
    role: 'Local Guide'
  },
  {
    name: 'Aisha Bello',
    text: "Their bakery is heaven. The meat pies are always fresh and packed with filling. I also love that I can grab some groceries before heading home.",
    role: 'Food Enthusiast'
  },
  {
    name: 'David N.',
    text: "Hosted my wife's birthday dinner at the Lounge. The staff went above and beyond to make it special. The cocktails are amazing.",
    role: 'VIP Member'
  },
  {
    name: 'Grace Ekpenyong',
    text: "The salon service is very professional, and it's so convenient to have it in the same complex as everything else.",
    role: 'Regular Customer'
  }
];

export function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center', breakpoints: { '(min-width: 768px)': { align: 'start' } } },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What Our Customers Say</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here is what people love about the Evening Sun experience.
          </p>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 pb-8">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl h-full flex flex-col">
                  <div className="flex gap-1 mb-6 text-yellow-300">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg mb-8 flex-grow leading-relaxed">"{t.text}"</p>
                  <div>
                    <h4 className="font-bold font-display text-xl">{t.name}</h4>
                    <p className="text-primary-foreground/70 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
