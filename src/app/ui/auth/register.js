'use client';
import React, { useState } from 'react';

export function RegistrationForm() {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically add your Supabase submission logic
        console.log("Form submitted:", insertNewData);
    };

    return (
        <div>
			<div>Let's get you a job!</div>
			<div>Sign up for custom resumes and cover letters in one click!</div>
            <form onSubmit={handleSubmit}>
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
                    Company:
                    <input
                        name="password"
                        value={insertNewData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <br />
				<div>By signing up you agree to our ToC and Privacy Policy</div>
                <input
                    type="submit"
                    value="Register"
                />
				<div>Already have an account? Log In</div>
            </form>
        </div>
    );
}
