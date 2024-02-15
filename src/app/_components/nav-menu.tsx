"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/app/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/_components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export function NavMenu() {
  const pathname = usePathname();
  const path = getBasePath(pathname);

  function getBasePath(path: string): string {
    const segments = path.split("/");
    return "/" + segments[1];
  }

  // console.log("getBasePath: ", getBasePath(pathname));

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-center align-middle">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "group flex w-full cursor-pointer justify-start rounded-lg bg-secondary p-3 text-base font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
              path === "/" && "bg-primary/10 text-primary",
            )}
          >
            Contacts
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Health">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Gola">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "group flex w-full cursor-pointer justify-start rounded-lg bg-secondary p-3 text-base font-medium text-muted-foreground transition    hover:bg-primary/10 hover:text-primary",
              path === "/chatBot" && "bg-primary/10 text-primary",
            )}
          >
            {" "}
            ChatBots
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
              <ListItem href="/docs" title="Health">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Gola">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/usermanagement" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-2 px-4 text-base font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary ",
                path === "/usermanagement" && "bg-primary/10 text-primary",
              )}
            >
              User Management
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
