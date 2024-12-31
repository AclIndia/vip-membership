import { SidebarNavItem } from "./dashboaard";


export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin/members",
        icon: "user",
        title: "Members",
      },
      { href: "/admin/renewal-data", icon: "dashboard", title: "Renewal Data" },
    ],
  },
];
