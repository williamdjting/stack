'use client';
import React, { useState } from 'react';

export function LoginForm() {
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
			<div>Lets help you make that resume and cover letter awesome!</div>
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
				<div>Forget Password?</div>
                <input
                    type="submit"
                    value="Login"
                />
				<div>Don’t have an account? Register</div>
            </form>
        </div>
    );
}
