import { Icons } from "@/components/shared/icons";

export type NavItem = {
    title: string;
    href: string;
    badge?: number;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
  };

  export type SidebarNavItem = {
    title: string;
    items: NavItem[];
    icon?: keyof typeof Icons;
  };