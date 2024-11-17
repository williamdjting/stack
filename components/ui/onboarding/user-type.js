import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

export function UserTypeForm() {
    const router = useRouter();


    const [insertNewData, setInsertNewData] = useState({
        computerscience: '',
        business: '',
        liberalarts: '',
        design: '',
        healthcare: '',
        skilledtrades: '',
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

        router.push("/onboarding/education")
    };

    return (
        <div>
            <div>Please select your user type!</div>
            <br />
            <div>This is your actual major, intended major, what industry you want your application to be made for.</div>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label htmlFor="html">computer science</label>
                <br />
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label htmlFor="css">business</label>
                <br />
                <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
                <label htmlFor="javascript">liberalarts</label>
                <br />
                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label htmlFor="html">design</label>
                <br />
                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label htmlFor="html">healthcare</label>
                <br />
                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label htmlFor="html">skilledtrades</label>
                <br />
                <br />
                <input type="submit" value="Next" />
            </form>
        </div>
    );
    
}