import { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onClose: () => void;
}

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      {
        text: 'By accessing or using the Evening Sun Eatery & Supermarket website and services — including placing orders, making reservations, or contacting us via WhatsApp — you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.',
      },
    ],
  },
  {
    title: 'Our Services',
    content: [
      {
        text: 'Evening Sun Eatery & Supermarket offers a range of services from a single location in Mosafejo, Nigeria, including:',
        list: [
          'Restaurant dining — Nigerian meals, shawarma, burgers, pizza, small chops, and drinks.',
          'Bakery — freshly baked bread, pastries, pies, and confectionery.',
          'Grill Spot — grilled meats, suya, and BBQ specialties.',
          'Lounge — premium drinks, live entertainment, and VIP seating.',
          'Snooker Arena — professional snooker tables and tournaments.',
          'Unisex Salon & Spa — hair, beauty, and wellness services.',
          'Supermarket — groceries, beverages, snacks, toiletries, household, and frozen goods.',
        ],
      },
    ],
  },
  {
    title: 'Ordering & Payments',
    content: [
      {
        text: 'All food and supermarket orders are processed via WhatsApp. By placing an order, you confirm that the information you provide (name, address, contact details) is accurate and complete.',
      },
      {
        text: 'Prices displayed on the website are subject to change without notice. Payment terms, including accepted payment methods, will be confirmed at the time of order via WhatsApp.',
      },
      {
        text: 'Evening Sun reserves the right to refuse or cancel any order at its discretion, including in cases of unavailability, pricing errors, or suspected fraudulent activity.',
      },
    ],
  },
  {
    title: 'Delivery & Pickup',
    content: [
      {
        text: 'Delivery is available within our service area. Delivery fees are calculated based on your location and will be communicated to you via WhatsApp before order confirmation.',
      },
      {
        text: 'Estimated delivery times are provided in good faith but may vary due to traffic, weather, or high demand. We are not liable for delays beyond our reasonable control.',
      },
      {
        text: 'Customers selecting pickup must collect their order within the agreed time window. Uncollected orders may be disposed of after a reasonable holding period.',
      },
    ],
  },
  {
    title: 'Salon & Snooker Bookings',
    content: [
      {
        text: 'Salon appointments and snooker table bookings are made via WhatsApp. Bookings are subject to availability and confirmed only upon our acknowledgement.',
      },
      {
        text: 'We request reasonable notice for cancellations or rescheduling. Repeated no-shows may result in restrictions on future bookings.',
      },
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      {
        text: 'All content on this website — including the Evening Sun logo, images, text, graphics, and design — is the property of Evening Sun Eatery & Supermarket and is protected by applicable intellectual property laws.',
      },
      {
        text: 'You may not reproduce, distribute, modify, or use any content from this website for commercial purposes without our prior written consent.',
      },
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      {
        text: 'To the fullest extent permitted by law, Evening Sun Eatery & Supermarket shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services.',
      },
      {
        text: 'Our total liability for any claim arising out of or relating to these Terms shall not exceed the amount you paid for the specific order or service in question.',
      },
    ],
  },
  {
    title: 'Changes to These Terms',
    content: [
      {
        text: 'We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of our services following any changes constitutes your acceptance of the revised terms.',
      },
      {
        text: 'We recommend checking this page periodically to stay informed of any updates.',
      },
    ],
  },
  {
    title: 'Governing Law',
    content: [
      {
        text: 'These Terms and Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.',
      },
    ],
  },
  {
    title: 'Contact Us',
    content: [
      {
        text: 'If you have any questions about these Terms and Conditions, please contact us:',
        list: [
          'WhatsApp: 08081734021',
          'Phone: 0808 173 4021 / 0813 148 0059',
          'Instagram: @evensuneatry',
          'Location: Evening Sun Complex, Mosafejo, Nigeria',
        ],
      },
    ],
  },
];

export function TermsConditionsPage({ onClose }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="container mx-auto max-w-4xl flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-display font-bold text-lg truncate">Terms & Conditions</span>
        </div>
      </div>

      {/* Hero band */}
      <div className="bg-gradient-to-br from-blue-500/10 via-background to-background border-b border-border/30 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our website or services. They set out the rules for using Evening Sun Eatery & Supermarket.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: July 2026</p>
        </div>
      </div>

      {/* Table of contents */}
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="bg-muted/40 border border-border/50 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Contents</h2>
          <ol className="grid sm:grid-cols-2 gap-2">
            {sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#tc-section-${i}`}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} id={`tc-section-${i}`} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold flex items-center justify-center shrink-0 mt-1">
                  {i + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{section.title}</h2>
              </div>

              <div className="ml-12 space-y-4">
                {section.content.map((block, j) => (
                  <div key={j}>
                    {'text' in block && block.text && (
                      <p className="text-muted-foreground leading-relaxed">{block.text}</p>
                    )}
                    {'list' in block && block.list && (
                      <ul className="mt-3 space-y-2">
                        {block.list.map((item, k) => (
                          <li key={k} className="flex items-start gap-3 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {i < sections.length - 1 && (
                <div className="mt-12 ml-12 border-b border-border/30" />
              )}
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-8 text-center">
          <p className="font-display font-bold text-xl mb-2">Have a question about our terms?</p>
          <p className="text-muted-foreground mb-6">We're always happy to clarify. Reach out to us directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={onClose} variant="outline" className="rounded-full">
              Back to Website
            </Button>
            <Button
              className="rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white"
              onClick={() => window.open('https://wa.me/2348081734021?text=Hi%2C+I+have+a+question+about+your+Terms+%26+Conditions.', '_blank')}
            >
              Contact Us on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Mini footer */}
      <div className="border-t border-border/30 py-8 px-4 mt-8 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Evening Sun Eatery & Supermarket. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
