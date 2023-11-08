"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { i18n } from "@/i18n";
import { useRouter, usePathname } from "next/navigation";

type LocaleDropdownProps = {
  locale: string;
};

export default function LocaleSwitcherTest({
  locale,
}: LocaleDropdownProps): JSX.Element {
  const router = useRouter();
  const pathName = usePathname();

  // Generate a redirected path based on the selected locale
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    if (typeof window === "undefined") {
      return null;
    } // returns null for SSR

    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/") + window.location.search;
  };

  return (
    <Dropdown className="min-w-[6em]" disableAnimation={true}>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="p-0 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-primary text-lg max-w-[6em]"
        >
          {locale}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        disallowEmptySelection
        selectionMode="single"
        onAction={(key) => router.replace(`${redirectedPathName(`${key}`)}`)}
      >
        {i18n.locales.map((locale) => {
          return <DropdownItem key={locale}>{locale}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
