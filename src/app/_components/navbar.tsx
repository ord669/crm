"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

import { cn } from "@/app/lib/utils";
import { MobileSidebar } from "@/app/_components/mobile-sidebar";
import { ModeToggle } from "@/app/_components/mode-toggle";

import { useProModal } from "@/app/hooks/use-pro-modal";

import { NavMenu } from "./nav-menu";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModal();

  return (
    <div className="Navbar  flex h-16 w-full items-center gap-5 border-b border-primary/10 bg-secondary px-2">
      <div className="flex justify-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
          <h1
            className={cn(
              "mr-1 hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            Crm
          </h1>
        </Link>
      </div>
      <div className="flex flex-grow items-center  gap-x-3">
        <div className="flex  flex-grow  items-center gap-x-2">
          <NavMenu />
        </div>
        {/* {!isPro && (
          <Button onClick={proModal.onOpen} size="sm" variant="premium">
            Upgrade
            <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
          </Button>
        )} */}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
