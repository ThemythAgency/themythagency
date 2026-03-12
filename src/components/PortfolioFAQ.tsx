import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/portfolioData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const PortfolioFAQ = () => {
  return (
    <section className="section-padding section-spacing bg-secondary/30">
      <motion.div {...fadeUp} className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="gold-line" />
            <span className="text-label text-accent">FAQ</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-display-lg mb-4">
            Questions we get{" "}
            <span className="italic text-accent">asked</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Straightforward answers to help you decide if we're the right fit.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="border border-border bg-background px-6 data-[state=open]:border-accent/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-display text-base md:text-lg font-medium py-5 hover:no-underline hover:text-accent transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm md:text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default PortfolioFAQ;
