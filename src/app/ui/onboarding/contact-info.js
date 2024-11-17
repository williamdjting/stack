import React, { useState } from 'react';

import { useRouter } from 'next/navigation';



export function ContactInfoForm() {
    const router = useRouter();

    const [insertNewData, setInsertNewData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        linkedin: '',
        personalwebsite: '',
        github: '',
        location: '',
        personalsummary: '',
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

        router.push("/onboarding/user-type");
    };

    return (
        <div>
			<div>Welcome to StackUp AI! </div>
            <br></br>
            <div>This will take 5 minutes. Please enter all the information. The more detail,  the better the result! :)</div>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div>
                    First Name
                    <input
                        name="firstname"
                        value={insertNewData.firstname}
                        onChange={handleChange}
                        placeholder="Enter your firstname"
                        required
                    />
                </div>
                <br />
                <div>
                    Last Name
                    <input
                        name="lastname"
                        value={insertNewData.lastname}
                        onChange={handleChange}
                        placeholder="Enter your lastname"
                        required
                    />
                </div>
                <br />
                <div>
                    Email
                    <input
                        name="email"
                        value={insertNewData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <br />
                <div>
                    LinkedIn
                    <input
                        name="linkedIn"
                        value={insertNewData.linkedIn}
                        onChange={handleChange}
                        placeholder="Enter your LinkedIn"
                        required
                    />
                </div>
                <br />
                <div>
                    Personal Website
                    <input
                        name="personalwebsite"
                        value={insertNewData.personalwebsite}
                        onChange={handleChange}
                        placeholder="Enter your personalwebsite"
                        required
                    />
                </div>
                <br />
                <div>
                    Github
                    <input
                        name="github"
                        value={insertNewData.github}
                        onChange={handleChange}
                        placeholder="Enter your github"
                        required
                    />
                </div>
                <br />
                <div>
                    Location
                    <input
                        name="location"
                        value={insertNewData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        required
                    />
                </div>
                <br />
                <div>
                    Personal Summary
                    <input
                        name="personalsummary"
                        value={insertNewData.personalsummary}
                        onChange={handleChange}
                        placeholder="Enter your personal summary"
                        required
                    />
                </div>
                <br />
                <input
                    type="submit"
                    value="Next"
                />
            </form>
        </div>
    );
}