"use client";

import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { useProModal } from "@/app/hooks/use-pro-modal";
import { routService } from "@/app/lib/route.service";

interface SidebarProps {
  isPro: boolean;
}

export const Sidebar = ({ isPro }: SidebarProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const pathname = usePathname();

  const path = getBasePath(pathname);

  function getBasePath(path: string): string[] {
    const segments = path.split("/");
    // Remove the empty string from the start of the array (due to the leading '/')
    segments.shift();
    return segments;
  }

  const onNavigate = (url: string, pro: boolean) => {
    // if (pro && !isPro) {
    // 	return proModal.onOpen()
    // }

    return router.push(url);
  };

  const routes = routService.getCurrPageRouts(path);

  return (
    <div className="side-bar flex h-full flex-col space-y-4 bg-secondary text-primary">
      <div className="flex flex-1 justify-center p-2">
        <div className="space-y-2 ">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.id}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
                pathname === route.href && "bg-primary/10 text-primary",
              )}
            >
              <div className="flex flex-1 flex-col items-center gap-y-2">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
