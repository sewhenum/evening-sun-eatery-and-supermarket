import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onClose: () => void;
}

const sections = [
  {
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Information You Provide Directly',
        text: 'When you place an order, make a reservation, or contact us through WhatsApp or our contact form, we may collect your name, phone number, delivery address, and any special instructions you provide.',
      },
      {
        subtitle: 'Information Collected Automatically',
        text: 'When you visit our website, we may automatically collect certain technical information such as your IP address, browser type, device information, pages visited, and the time and date of your visit. This helps us understand how our site is being used and improve your experience.',
      },
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      {
        text: 'We use the information we collect for the following purposes:',
        list: [
          'To process and fulfil your food orders, supermarket purchases, and service bookings.',
          'To communicate with you about your order status, delivery updates, or appointment confirmations via WhatsApp.',
          'To respond to your enquiries and provide customer support.',
          'To send promotional updates, special offers, and newsletters — only if you have opted in.',
          'To improve our website, products, and services based on your feedback and usage patterns.',
          'To comply with applicable legal obligations.',
        ],
      },
    ],
  },
  {
    title: 'Cookies',
    content: [
      {
        text: 'Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences such as your selected theme (light or dark mode) and cart contents.',
      },
      {
        text: 'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some features of the website may not function correctly.',
      },
    ],
  },
  {
    title: 'Sharing Your Information',
    content: [
      {
        text: 'We value your privacy and do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:',
        list: [
          'With delivery partners or logistics personnel solely for the purpose of fulfilling your order.',
          'With service providers who assist us in operating our website and business, subject to strict confidentiality agreements.',
          'When required by law, court order, or governmental authority.',
          'In connection with a business transfer, merger, or acquisition, where your information may be transferred as part of the business assets.',
        ],
      },
    ],
  },
  {
    title: 'Data Security',
    content: [
      {
        text: 'We take the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction.',
      },
      {
        text: 'Please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security. We encourage you to avoid sharing sensitive information unnecessarily when contacting us.',
      },
    ],
  },
  {
    title: 'Your Rights',
    content: [
      {
        text: 'You have the following rights in relation to your personal information:',
        list: [
          'Access: You may request a copy of the personal information we hold about you.',
          'Correction: You may request that we correct any inaccurate or incomplete information.',
          'Deletion: You may request the deletion of your personal data, subject to any legal obligations we may have to retain it.',
          'Objection: You may object to the processing of your personal information for direct marketing purposes at any time.',
          'Withdrawal of Consent: Where we rely on your consent to process your data, you may withdraw that consent at any time.',
        ],
      },
      {
        text: 'To exercise any of these rights, please contact us via WhatsApp or through our contact page.',
      },
    ],
  },
  {
    title: 'Third-Party Services',
    content: [
      {
        text: 'Our website may contain links to third-party websites and services, including WhatsApp (Meta Platforms Inc.) and social media platforms such as Instagram and Facebook. We are not responsible for the privacy practices of these third parties.',
      },
      {
        text: 'We use WhatsApp as our primary communication and ordering channel. Any information you share via WhatsApp is subject to Meta\'s Privacy Policy. We encourage you to review their policies before using these platforms.',
      },
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      {
        text: 'Our website and services are not directed at children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately so we can delete the relevant data.',
      },
    ],
  },
  {
    title: 'Contact Us',
    content: [
      {
        text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please do not hesitate to reach out to us:',
        list: [
          'WhatsApp: 08081734021',
          'Phone: 0808 173 4021 / 0813 148 0059',
          'Instagram: @evensuneatry',
          'Location: Evening Sun Complex, Mosafejo, Nigeria',
        ],
      },
      {
        text: 'We will respond to all enquiries within 5 business days.',
      },
    ],
  },
];

export function PrivacyPolicyPage({ onClose }: Props) {
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
          <span className="font-display font-bold text-lg truncate">Privacy Policy</span>
        </div>
      </div>

      {/* Hero band */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border/30 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Evening Sun Eatery & Supermarket collects, uses, and protects your personal information.
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
                  href={`#section-${i}`}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
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
            <section key={i} id={`section-${i}`} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-1">
                  {i + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{section.title}</h2>
              </div>

              <div className="ml-12 space-y-4">
                {section.content.map((block, j) => (
                  <div key={j}>
                    {'subtitle' in block && block.subtitle && (
                      <h3 className="font-semibold text-base mb-2">{block.subtitle}</h3>
                    )}
                    {'text' in block && block.text && (
                      <p className="text-muted-foreground leading-relaxed">{block.text}</p>
                    )}
                    {'list' in block && block.list && (
                      <ul className="mt-3 space-y-2">
                        {block.list.map((item, k) => (
                          <li key={k} className="flex items-start gap-3 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <p className="font-display font-bold text-xl mb-2">Still have questions?</p>
          <p className="text-muted-foreground mb-6">Reach out to us anytime — we're happy to help clarify anything in this policy.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full"
            >
              Back to Website
            </Button>
            <Button
              className="rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white"
              onClick={() => window.open('https://wa.me/2348081734021?text=Hi%2C+I+have+a+question+about+your+Privacy+Policy.', '_blank')}
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
