"use client";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { HeaderLogo } from "@/components/header-logo";

import { Filters } from "@/components/filters";
import { useHideInfos } from "@/hooks/use-hide-infos";
import { WelcomeMessage } from "@/components/welcome-message";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const Header = () => {
  const pathname = usePathname();
  const { hideInfos, onToggle } = useHideInfos();

  const handleToggle = () => onToggle();

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex items-center gap-x-4">
            {pathname === "/" && (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger
                    className="flex justify-center w-full color"
                    onClick={handleToggle}
                  >
                    {hideInfos ? (
                      <EyeIcon className="size-8 text-slate-700" />
                    ) : (
                      <EyeOffIcon className="size-8 text-slate-700" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {hideInfos
                      ? "Mostrar informações"
                      : "Esconder informações sensíveis"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
};
