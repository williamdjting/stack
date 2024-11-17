import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

export function SkillsForm() {

    const router = useRouter();

    const [insertNewData, setInsertNewData] = useState({
        codinglanguages: '',
        programmingconcepts: '',
        tools: '',
        frameworks: '',
    });

    const [insertNewData2, setInsertNewData2] = useState({
        businesscommunications: '',
        leadership: '',
        projectmanagement: '',
        technical: '',
    });

    const [selectedSkill, setSelectedSkill] = useState('');

    // Handler to update the state based on selection
    const handleSelection = (e) => {
        setSelectedSkill(e.target.value);
    };

    // Handler to update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsertNewData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handler to update form data
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setInsertNewData2((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handler to submit form data to Supabase
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically add your Supabase submission logic
        console.log("Form submitted:", insertNewData);


    //       router.push("/xyz")  //push to where?

    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        // Here you would typically add your Supabase submission logic
        console.log("Form submitted:", insertNewData2);


            //       router.push("/xyz")  //push to where?
    };

    return (
        <div>

            <div>Finally, add your skills!</div>
            <br></br>


            {/* option selector for the skill choice, maybe this is not need*/}
            <div>
                <form>
                    <label htmlFor="skills">Skill Options: </label>
                    <select name="skills" id="skills" onChange={handleSelection}>
                        <option value="technical">Technical Skills</option>
                        <option value="business">Business Skills</option>
                    </select>
                </form>
            </div>



            {/* Conditionally render the JSX based on selectedSkill */}

            {selectedSkill === '' && (
                <div>
                    <br></br>

                    <form onSubmit={handleSubmit}>
                        <div>
                            Coding Languages
                            <input
                                name="codinglanguages"
                                value={insertNewData.codinglanguages}
                                onChange={handleChange}
                                placeholder="Enter your coding languages"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Programming Concepts
                            <input
                                name="programmingconcepts"
                                value={insertNewData.programmingconcepts}
                                onChange={handleChange}
                                placeholder="Enter your programming concepts"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Tools / Applications
                            <input
                                name="tools"
                                value={insertNewData.tools}
                                onChange={handleChange}
                                placeholder="Enter your tools / applications"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Frameworks
                            <input
                                name="frameworks"
                                value={insertNewData.frameworks}
                                onChange={handleChange}
                                placeholder="Enter your frameworks"
                                required
                            />
                        </div>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}

            {selectedSkill === 'technical' && (
                <div>
                    <br></br>

                    <form onSubmit={handleSubmit}>
                        <div>
                            Coding Languages
                            <input
                                name="codinglanguages"
                                value={insertNewData.codinglanguages}
                                onChange={handleChange}
                                placeholder="Enter your coding languages"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Programming Concepts
                            <input
                                name="programmingconcepts"
                                value={insertNewData.programmingconcepts}
                                onChange={handleChange}
                                placeholder="Enter your programming concepts"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Tools / Applications
                            <input
                                name="tools"
                                value={insertNewData.tools}
                                onChange={handleChange}
                                placeholder="Enter your tools / applications"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Frameworks
                            <input
                                name="frameworks"
                                value={insertNewData.frameworks}
                                onChange={handleChange}
                                placeholder="Enter your frameworks"
                                required
                            />
                        </div>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}

{selectedSkill === 'business' && (
                <div>
                    <br></br>

                    <form onSubmit={handleSubmit2}>
                        <div>
                            Business Communications
                            <input
                                name="businesscommunications"
                                value={insertNewData2.businesscommunications}
                                onChange={handleChange2}
                                placeholder="Enter your business communications"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Leadership / Case Competition
                            <input
                                name="leadership"
                                value={insertNewData2.leadershipskills}
                                onChange={handleChange2}
                                placeholder="Enter your leadership / case competition skills"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Project Management
                            <input
                                name="projectmanagement"
                                value={insertNewData2.projectmanagement}
                                onChange={handleChange2}
                                placeholder="Enter your project management"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            Technical / Data Analysis Knowledge
                            <input
                                name="technical"
                                value={insertNewData2.frameworks}
                                onChange={handleChange2}
                                placeholder="Enter your technical / data analysis knowledge"
                                required
                            />
                        </div>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}


        </div>
    );
}