"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/components/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { lang, setLang } = useLanguage();
  const t = lang === "en" ? en.Navbar : lang === "si" ? si.Navbar : ta.Navbar;

  return (
    <header
      className={cn(
        "w-full z-50 transition-all duration-300",
        isHomePage
          ? "absolute top-0 left-0 text-white"
          : "sticky top-0 bg-white border-b border-gray-200 shadow-sm text-gray-900"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className={cn(
              "font-black text-2xl font-heading transition-colors",
              isHomePage
                ? "text-white hover:text-gray-200"
                : "text-[#003580] hover:text-[#002147]"
            )}
          >
            {t.logo}
          </Link>

          <Link
            href="/search"
            className={cn(
              "font-medium text-sm hover:underline transition-colors opacity-70 hover:opacity-100",
              isHomePage
                ? "text-white/90 hover:text-white"
                : "text-gray-700 hover:text-[#003580]",
              pathname === "/search" && "text-[#003580] font-semibold"
            )}
          >
            {t.explore}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={isHomePage ? "ghost" : "outline"}>
                🌍{" "}
                {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <button onClick={() => setLang("en")}>
                  English {lang === "en" && "✅"}
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={() => setLang("si")}>
                  සිංහල {lang === "si" && "✅"}
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={() => setLang("ta")}>
                  தமிழ் {lang === "ta" && "✅"}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            variant={isHomePage ? "ghost" : "outline"}
            className="transition-all"
          >
            <Link href="/account">{t.postJobs}</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link href="/account">{t.myAccount}</Link>
          </Button>

          <Button
            asChild
            variant={isHomePage ? "ghost" : "outline"}
            className="transition-all"
          >
            <Link href="/profile">{t.myProfile}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
