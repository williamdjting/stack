'use client';

import React from 'react';
import Link from 'next/link';
import { createClient } from '../../../app/supabase/client';
import { useRouter } from 'next/navigation';

// Import the CSS module
import styles from '../../../styles/sidebar.module.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export function Sidebar() {
	const router = useRouter();
	const supabase = createClient();
	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
		} else {
			router.push('/auth/login');
		}
	};
	return (
		<>
			<SidebarProvider>
				<AppSidebar onSignOut={handleSignOut} />
			</SidebarProvider>
		</>
	);
}
