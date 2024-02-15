import { Home, Plus, Settings, Tv } from "lucide-react";
import React from "react";

export const routService = {
  getCurrPageRouts,
};

type RouteType = {
  id: number;
  icon: React.ElementType;
  href: string;
  label: string;
  belongsToPath: string[];
  pro: boolean;
};

const routes = [
  {
    id: 1,
    icon: Home,
    href: "/",
    label: "Home",
    belongsToPath: ["", "dashboard"],

    pro: false,
  },
  {
    id: 2,
    icon: Plus,
    href: "/chatbots/chatbot/new",
    label: "Create",
    belongsToPath: ["", "chatbots", "contacts", "inbox"],
    pro: true,
  },
  {
    id: 3,
    icon: Settings,
    href: "/settings",
    label: "Settings",
    belongsToPath: ["settings", "chat", "inbox"],
    pro: false,
  },
  {
    id: 8,
    icon: Tv,
    href: "/settings",
    label: "Channels",
    belongsToPath: ["chatbots", "inbox"],
    pro: false,
  },
];

function getCurrPageRouts(path: string[]): RouteType[] {
  // console.log("path: ", path);
  return routes.filter((route) =>
    route.belongsToPath.some((segment) => path.includes(segment)),
  );
}
