import SideNav from '@/app/ui/dashboard/sidenav';

import { Header } from "@/app/ui/dashboard/header";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div>
        {/* <Header /> */}

        {/* <SideNav /> */}

      </div>

      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}