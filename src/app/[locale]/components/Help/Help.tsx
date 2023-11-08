"use client";

import { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { Image } from "@nextui-org/react";

type FAQs = {
  translate: string;
  Form: ComponentType;
};

export default function FAQs({ translate, Form }: FAQs) {
  const t = useTranslations(`${translate}`);
  return (
    <>
      <section className="container mx-auto flex min-h-[40vh] gap-y-20 w-[95%] sm:w-[50%] justify-center pt-6">
        <section className="flex flex-col justify-center items-center">
          <Image
            src="https://green-forest-030f1a603.2.azurestaticapps.net/img/illustrations/FaqImage.svg"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="clarinet"
            className=" self-center"
          />
          <section className="flex flex-col gap-3 justify-center items-center py-10">
            <h1 className="font-bold text-5xl">{t("title")}</h1>
            <h5 className="">{t("subTitle")}</h5>
          </section>
        </section>
      </section>
      <section className="container mx-auto flex flex-col min-h-[40vh] gap-y-3 w-[80%] justify-center">
        <Form />
      </section>
    </>
  );
}
