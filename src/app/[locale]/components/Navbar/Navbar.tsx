"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

import NavbarItems from "./NavbarItems";
import NavbarProfile from "./NavbarProfile";
import LocaleDropdown from "./LocaleDropdown";
import ThemeSwitcher from "./ThemeSwitcher";

type NavbarProps = {
  locale: string;
};

export default function MainNavbar({ locale }: NavbarProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    async function handleNavbar() {
      const session = await getSession();
      if (!session) {
        setIsAuthenticated(false);
      } else setIsAuthenticated(true);
    }
    handleNavbar();
  }, [pathname]);

  return (
    <Navbar
      height={"4rem"}
      className="flex justify-between align-middle px-5"
      maxWidth="full"
      shouldHideOnScroll={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-2xl">EINVOICING</p>
      </NavbarBrand>
      {isAuthenticated ? <NavbarItems isMobile={false} /> : null}
      <NavbarContent justify="end" className="hidden md:flex ">
        <ThemeSwitcher />
        <LocaleDropdown locale={locale} />
        {isAuthenticated ? <NavbarProfile /> : null}
      </NavbarContent>

      <NavbarMenu>
        <section className="">
          {/* flex justify-between */}
          <NavbarItems isMobile={true} />
          <section className="flex flex-col gap-4 pt-3">
            <ThemeSwitcher />
            <LocaleDropdown locale={locale} />
            {isAuthenticated ? <NavbarProfile /> : null}
          </section>
        </section>
      </NavbarMenu>
    </Navbar>
  );
}
