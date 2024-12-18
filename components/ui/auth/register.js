'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../app/supabase/client';

const supabase = createClient();

export function RegistrationForm() {
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
		});

		if (error) {
			console.log('Error: ', error.message);
		} else {
			window.alert('Please check your email to verify your account!');
		}
	};

	const handleLogIn = (e) => {
		e.preventDefault();
		router.push('/auth/login');
	};

	return (
		<div>
			<div>Let's get you a job!</div>
			<div>Sign up for custom resumes and cover letters in one click!</div>
			<form>
				<div>
					Email Address
					<input
						name="emailaddress"
						value={insertNewData.emailaddress}
						onChange={handleChange}
						placeholder="Enter your email address"
						required
					/>
				</div>
				<br />
				<div>
					Password:
					<input
						type="password"
						name="password"
						value={insertNewData.password}
						onChange={handleChange}
						placeholder="Enter your password"
						required
					/>
				</div>
				<br />
				<div>By signing up you agree to our ToC and Privacy Policy</div>
				<button onClick={handleSignUp}>Register</button>
				<button onClick={handleLogIn}>Already have an account? Log In</button>
			</form>
		</div>
	);
}
