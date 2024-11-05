'use client';
import React, { useState } from 'react';

export function ProjectsForm() {
    const [insertNewData, setInsertNewData] = useState({
        company: '',
        location: '',
        startmonth: '',
        startyear: '',
        endmonth: '',
        endyear: '',
        other: '',
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
			<div>Add your projects</div>
            <br></br>
            <div>Project 1</div>
            <form onSubmit={handleSubmit}>
                <div>
                    Company
                    <input
                        name="company"
                        value={insertNewData.company}
                        onChange={handleChange}
                        placeholder="Enter your company"
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
                    Start Month
                    <input
                        name="startmonth"
                        value={insertNewData.startmonth}
                        onChange={handleChange}
                        placeholder="Enter your start month"
                        required
                    />
                </div>
                <br />
                <div>
                    Start Year
                    <input
                        name="startyear"
                        value={insertNewData.startyear}
                        onChange={handleChange}
                        placeholder="Enter your start year"
                        required
                    />
                </div>
                <br />
                <div>
                    End Month
                    <input
                        name="endmonth"
                        value={insertNewData.endmonth}
                        onChange={handleChange}
                        placeholder="Enter your end month"
                        required
                    />
                </div>
                <br />
                <div>
                    End Year
                    <input
                        name="endyear"
                        value={insertNewData.endyear}
                        onChange={handleChange}
                        placeholder="Enter your end year"
                        required
                    />
                </div>
                <div>I am currently building this</div>
                <br />
                <div>
                        Description      
                        <br></br>              
                        <textarea
                        name="other"
                        value={insertNewData.other}
                        onChange={handleChange}
                        placeholder="Enter any other information"
                        row={5}
                        col={25}
                        required
                    />
                </div>
                <div>Add a Project</div>
                <br />
                <input
                    type="submit"
                    value="Next"
                />
            </form>
        </div>
    );
}