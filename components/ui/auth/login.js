'use client';
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

import { useRouter } from 'next/navigation';
// import { supabase } from '../../../lib/supabase/server';
import { createClient } from '../../../app/supabase/client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const supabase = createClient();

export function LoginForm() {
	const router = useRouter();
	const [insertNewData, setInsertNewData] = useState({
		emailaddress: '',
		password: '',
	});

	// Handler to update form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInsertNewData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// Handler to submit form data to Supabase
	const handleLogIn = async (e) => {
		e.preventDefault();
		// Here you would typically add your Supabase submission logic
		const { emailaddress, password } = insertNewData;

		console.log('Form submitted:', insertNewData);

		const { data, error } = await supabase.auth.signInWithPassword({
			email: emailaddress,
			password: password,
		});

		if (error) {
			console.log('Error: ', error.message);
		} else {
			router.push('/dashboard');
		}
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		router.push('/auth/register');
	};

	return (
		<div className="bg-skyblue min-h-screen flex items-center justify-center">
			<Card className="min-w-[531px] min-h-[404px]">
				<CardHeader>
					<CardTitle>Welcome Back!</CardTitle>
					<CardDescription>
						Sign in to continue creating awesome resumes and cover letters.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-ceneter gap-4">
							<div className="flex flex-col space-y-1.5">
								<p>Email</p>
								<Input
									name="emailaddress"
									value={insertNewData.emailaddress}
									onChange={handleChange}
									placeholder="Enter your email address"
									className="focus-visible:ring-skyblue"
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<p>Password</p>
								<Input
									type="password"
									name="password"
									value={insertNewData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="focus-visible:ring-skyblue"
									required
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button
						className="w-full"
						onClick={handleLogIn}
						variant="skyblue"
					>
						Sign in
					</Button>
					<p className="text-gray-600 text-sm">
						Dont have an account?{' '}
						<a
							className="text-gray-800 hover:underline cursor-pointer"
							onClick={handleSignUp}
						>
							Register
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
