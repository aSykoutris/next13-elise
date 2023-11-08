"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { ComponentType } from "react";
import { useLocale } from "next-intl";

import { BodyEN1, BodyEN2, BodyEN3, BodyEL1 } from "./Data";

type questions = {
  title: string;
  subTitle?: string;
  accordion: {
    label: string;
    body: ComponentType;
  }[];
}[];

export default function FAQsForm() {
  const locale = useLocale();

  const itemClasses = {
    title: "font-normal text-small",
  };

  const questionsEN: questions = [
    {
      title: "1. Outage",
      subTitle:
        "These questions and answers are commonly asked when an outage scenario occurs.",
      accordion: [
        {
          label: "What happens when I have lost internet connectivity?",
          body: BodyEN1,
        },
      ],
    },
    {
      title: "2. VAT Number Validation",
      accordion: [
        {
          label: "How can I validate a european VAT number?",
          body: BodyEN2,
        },
        {
          label: "How can I validate a Greek VAT number?",
          body: BodyEN3,
        },
      ],
    },
  ];

  const questionsEL: questions = [
    {
      title: "1. Πρόβλημα σύνδεσης",
      subTitle:
        "Τα παρακάτω ερωτήματα και απαντήσεις βοηθούν σε περίπτωση που υπάρχει πρόβλημα συνδεσιμότητας με τον πάροχο.",
      accordion: [
        {
          label: "Πως τιμολογώ όταν δεν έχω πρόσβαση στο Ίντερνετ;",
          body: BodyEL1,
        },
      ],
    },
  ];

  const selectedLocale = locale === "en" ? questionsEN : questionsEL;

  return (
    <>
      {selectedLocale.map((faq) => {
        return (
          <section className="flex flex-col w-full gap-y-3" key={faq.title}>
            <h3 className="text-secondary font-semibold text-xl pl-4">
              {faq.title}
            </h3>
            <h5 className="text-black pl-4">{faq.subTitle}</h5>
            <Accordion
              variant="splitted"
              key={faq.title}
              itemClasses={itemClasses}
            >
              {faq.accordion.map((acc) => {
                return (
                  <AccordionItem
                    key={acc.label}
                    aria-label={acc.label}
                    title={acc.label}
                  >
                    <acc.body />
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        );
      })}
    </>
  );
}
