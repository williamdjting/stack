// 'use client'; // Add this line at the top if this is in the app directory

import { useRouter } from 'next/navigation';

export function redirectDashboardClient() {
  const router = useRouter();
  router.push('/dashboard');
}
