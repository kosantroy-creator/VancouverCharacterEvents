import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = { q: string; a: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border-soft">
          <AccordionTrigger className="text-left font-display text-lg text-fg hover:text-fg-gold hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-fg-2">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
