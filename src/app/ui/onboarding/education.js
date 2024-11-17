import React, { useState } from 'react';


import { useRouter } from 'next/navigation';


export function EducationForm() {
    const router = useRouter();

    const [insertNewData, setInsertNewData] = useState({
        school: '',
        major: '',
        degreetype: '',
        GPA: '',
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

        router.push("/onboarding/work-experience")


    };

    return (
        <div>
			<div>Add your education history </div>
            <br></br>
            <div>Education 1</div>
            <form onSubmit={handleSubmit}>
                <div>
                    School Name
                    <input
                        name="school"
                        value={insertNewData.school}
                        onChange={handleChange}
                        placeholder="Enter your school"
                        required
                    />
                </div>
                <br />
                <div>
                    Major
                    <input
                        name="major"
                        value={insertNewData.major}
                        onChange={handleChange}
                        placeholder="Enter your major"
                        required
                    />
                </div>
                <br />
                <div>
                    Degree Type
                    <input
                        name="degreetype"
                        value={insertNewData.degreetype}
                        onChange={handleChange}
                        placeholder="Enter your degree type"
                        required
                    />
                </div>
                <br />
                <div>
                    GPA
                    <input
                        name="GPA"
                        value={insertNewData.GPA}
                        onChange={handleChange}
                        placeholder="Enter your GPA"
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
                <div>Clear Dates</div>
                <br />
                <div>
                    Courses Taken / Concepts Learned / Scholarships / Other
                    <input
                        name="other"
                        value={insertNewData.other}
                        onChange={handleChange}
                        placeholder="Enter any other information"
                        required
                    />
                </div>
                <div>Add Education</div>
                <br />
                <input
                    type="submit"
                    value="Next"
                />
            </form>
        </div>
    );
}