import { sidebarLinks } from "@/config/dashboard";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { DashboardSidebar, MobileSheetSidebar } from "@/components/dashboard/dashboard-sidebar";
import DynamicBreadcrumb from "@/components/dashboard/dynamic-breadcrumb";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Price list of all polymers",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
      <div className="relative flex min-h-screen w-screen">
        <DashboardSidebar links={sidebarLinks} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
            <div className="flex w-full items-center gap-x-3 px-0">
              <MobileSheetSidebar links={sidebarLinks} />
            </div>
          </header>
          <main className="flex-1 p-4 xl:px-8">
            <div className="flex h-full w-full flex-col gap-4 px-0 lg:gap-6">
            <DynamicBreadcrumb />
            <Toaster />
              {children}
            </div>
          </main>
        </div>
      </div>
  );
};

export default Layout;
