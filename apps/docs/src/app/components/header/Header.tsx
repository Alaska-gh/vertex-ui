"use client"

import { FaGithub } from "react-icons/fa6";
import { Button } from "@vertex-ui/react";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SearchTrigger } from "./SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { SearchDialog } from "./search/Searchdialog";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Logo />

          <div className="flex items-center gap-2">
            <SearchTrigger onClick={() => setSearchOpen(true)} />
            <Navigation />

            <Button variant="ghost" size="icon" aria-label="GitHub">
              <FaGithub size={18} />
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchDialog 
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
