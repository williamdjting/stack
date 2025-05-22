// this is the homepage where the forms get rendedred
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { createClient } from '../app/supabase/client';

export default function Page() {
	const router = useRouter();
	const [dots, setDots] = useState('.');
	// const supabase = createClient();

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
		}, 500);

		const timer = setTimeout(() => {
			router.push('/auth/onboarding');
		}, 3000);

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	}, [router]);

	return (
		<main>
			<div className="bg-skyblue min-h-screen flex items-center justify-center">
				<p className="text-2xl">
					Your account has been verified, please wait a moment while you are
					redirected{dots}
				</p>
			</div>
		</main>
	);
}
