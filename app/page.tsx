import Notes from "../components/ui/dashboard/notes";


import { Header } from "../components/ui/dashboard/header";

import { Footer } from "../components/ui/dashboard/footer";

import { Sidebar } from "../components/ui/dashboard/sidebar";

// import { AddProject } from "../ui/dashboard/add-project";
import styles from "../styles/dashboard.module.css";
// import { isDataView } from "util/types";

// import SideNav from '@/app/ui/dashboard/sidenav';

// this is the homepage where the forms get rendedred
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main>
      <div>

        Your account has been verified!
      </div>
    </main>
  );
}
