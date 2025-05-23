'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useToast, usetoast } from '@/hooks/use-toast';

const supabase = createClient();

export function RegistrationForm() {
	const { toast } = useToast();
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

	const handleSignUp = async (e) => {
		e.preventDefault();
		const { emailaddress, password } = insertNewData;

		console.log('Form submitted:', insertNewData);

		const { data, error } = await supabase.auth.signUp({
			email: emailaddress,
			password: password,
			options: {
				emailRedirectTo: 'https://stack-gold.vercel.app',
			},
		});

		if (error) {
			console.log('Error: ', error.message);
			toast({
				title: 'Registration failed',
				description: error.message,
				variant: 'destructive',
			});
		} else {
			toast({
				description: 'Please check your email to verify your account!',
			});
		}
	};

	const handleLogIn = (e) => {
		e.preventDefault();
		router.push('/auth/login');
	};

	return (
		<div className="bg-skyblue min-h-screen flex items-center justify-center">
			<Card>
				<CardHeader>
					<CardTitle>Get Started</CardTitle>
					<CardDescription>
						Register to begin creating custom resumes and cover letters in one
						click!
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
							<p className="text-xs text-gray-600">
								By signing up you agree to our ToC and Privacy Policy
							</p>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button
						className="w-full"
						onClick={handleSignUp}
						variant="skyblue"
					>
						Register
					</Button>
					<p className="text-gray-600 text-sm">
						Already have an account?{' '}
						<a
							className="text-gray-800 hover:underline cursor-pointer"
							onClick={handleLogIn}
						>
							Sign in
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
