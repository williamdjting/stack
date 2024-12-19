'use client';

// uses this chatgpt as inspiration https://chatgpt.com/share/675a02af-58d0-8008-9e32-44fe262a0f04

import React, { useState } from 'react';
import { createClient } from '../../../app/supabase/client';

const supabase = createClient();

export function OnboardingFlow() {
	// const nextStep = () => setStep((prevStep) => prevStep + 1);

	const nextStep = () => {
		// console.log("Current State:", insertNewData); // Ensure this logs the latest state

		setStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

	const [step, setStep] = useState(0);

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

	const [insertEducationData, setInsertEducationData] = useState({
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

	const [insertLeadershipVolunteerData, setinsertLeadershipVolunteerData] =
		useState({
			company: '',
			location: '',
			position: '',
			experiencetype: '',
			startmonth: '',
			startyear: '',
			endmonth: '',
			endyear: '',
			other: '',
		});

	const [insertProjectData, setinsertProjectData] = useState({
		company: '',
		location: '',
		startmonth: '',
		startyear: '',
		endmonth: '',
		endyear: '',
		other: '',
	});

	const [insertSkills1Form, setInsertSkills1Form] = useState({
		codinglanguages: '',
		programmingconcepts: '',
		tools: '',
		frameworks: '',
	});

	const [insertSkills2Form, setInsertSkills2Form] = useState({
		businesscommunications: '',
		leadership: '',
		projectmanagement: '',
		technical: '',
	});

	const [insertWorkData, setInsertWorkData] = useState({
		company: '',
		location: '',
		position: '',
		experiencetype: '',
		startmonth: '',
		startyear: '',
		endmonth: '',
		endyear: '',
		other: '',
	});

	// const [preferences, setPreferences] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		const user_id = user.id;
		// const email = user.email;

		// send all the state objects to DB
		// Insert new data to Supabase
		const { data, error } = await supabase
			.from('profile_info')
			.insert({
				user_id: user_id,
				firstname: insertNewData.firstname,
				lastname: insertNewData.lastname,
				email: insertNewData.email,
				linkedin: insertNewData.linkedin,
				personalwebsite: insertNewData.personalwebsite,
				github: insertNewData.github,
				location: insertNewData.location,
				personalsummary: insertNewData.personalsummary,
				education: {
					school: insertEducationData.school,
					major: insertEducationData.major,
					degreetype: insertEducationData.degreetype,
					GPA: insertEducationData.GPA,
					startmonth: insertEducationData.startmonth,
					startyear: insertEducationData.startyear,
					endmonth: insertEducationData.endmonth,
					endyear: insertEducationData.endyear,
					other: insertEducationData.other,
				},
				workexperience: {
					company: insertWorkData.company,
					location: insertWorkData.location,
					position: insertWorkData.position,
					experiencetype: insertWorkData.experiencetype,
					startmonth: insertWorkData.startmonth,
					startyear: insertWorkData.startyear,
					endmonth: insertWorkData.endmonth,
					endyear: insertWorkData.endyear,
					other: insertWorkData.other,
				},
				leadershipvolunteer: {
					company: insertLeadershipVolunteerData.company,
					location: insertLeadershipVolunteerData.location,
					position: insertLeadershipVolunteerData.position,
					experiencetype: insertLeadershipVolunteerData.experiencetype,
					startmonth: insertLeadershipVolunteerData.startmonth,
					startyear: insertLeadershipVolunteerData.startyear,
					endmonth: insertLeadershipVolunteerData.endmonth,
					endyear: insertLeadershipVolunteerData.endyear,
					other: insertLeadershipVolunteerData.other,
				},
				projects: {
					company: insertProjectData.company,
					location: insertProjectData.location,
					startmonth: insertProjectData.startmonth,
					startyear: insertProjectData.startyear,
					endmonth: insertProjectData.endmonth,
					endyear: insertProjectData.endyear,
					other: insertProjectData.other,
				},
				technicalskills: {
					codinglanguages: insertSkills1Form.codinglanguages,
					programmingconcepts: insertSkills1Form.programmingconcepts,
					tools: insertSkills1Form.tools,
					frameworks: insertSkills1Form.frameworks,
				},
				businessskills: {
					businesscommunications: insertSkills2Form.businesscommunications,
					leadership: insertSkills2Form.leadership,
					projectmanagement: insertSkills2Form.projectmanagement,
					technical: insertSkills2Form.technical,
				},
			})
			.select();
		if (error) {
			console.error('Insert error:', error);
		}

		console.log('this is handleSubmit');
	};

	const steps = [
		<ContactInfoForm
			key="contactinfoform"
			insertNewData={insertNewData}
			setInsertNewData={setInsertNewData}
		/>,
		<EducationForm
			key="educationform"
			insertEducationData={insertEducationData}
			setInsertEducationData={setInsertEducationData}
		/>,
		<WorkExperienceForm
			key="workexperienceform"
			insertWorkData={insertWorkData}
			setInsertWorkData={setInsertWorkData}
		/>,
		<LeadershipVolunteerExperienceForm
			key="leadershipvolunteerform"
			insertLeadershipVolunteerData={insertLeadershipVolunteerData}
			setinsertLeadershipVolunteerData={setinsertLeadershipVolunteerData}
		/>,
		<ProjectsForm
			key="projectform"
			insertProjectData={insertProjectData}
			setinsertProjectData={setinsertProjectData}
		/>,
		<SkillsForm
			key="skillform"
			insertSkills1Form={insertSkills1Form}
			setInsertSkills1Form={setInsertSkills1Form}
			insertSkills2Form={insertSkills2Form}
			setInsertSkills2Form={setInsertSkills2Form}
		/>,
		// <PreferencesStep
		//   key="preferences"
		//   preferences={preferences}
		//   setPreferences={setPreferences}
		// />,
		<SummaryStep
			key="summary"
			insertNewData={insertNewData}
			insertEducationData={insertEducationData}
			insertWorkData={insertWorkData}
			insertLeadershipVolunteerData={insertLeadershipVolunteerData}
			insertProjectData={insertProjectData}
			insertSkills1Form={insertSkills1Form}
			insertSkills2Form={insertSkills2Form}
		/>,
	];

	return (
		<div>
			<div>{steps[step]}</div>
			<div>
				{step > 0 && <button onClick={prevStep}>Back</button>}
				{step < steps.length - 1 && <button onClick={nextStep}>Next</button>}
				{step === steps.length - 1 && (
					// <button onClick={() => alert('Onboarding Complete!')}>Finish</button>
					// change to the below onSubmit that sends to DB
					<button onClick={handleSubmit}>Finish</button>
				)}
			</div>
		</div>
	);
}

const ContactInfoForm = ({ insertNewData, setInsertNewData }) => {
	// Handler to update form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInsertNewData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<div>Welcome to StackUp AI! </div>
			<br></br>
			<div>
				This will take 5 minutes. Please enter all the information. The more
				detail, the better the result! :)
			</div>
			<br></br>
			<form>
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
						name="linkedin"
						value={insertNewData.linkedin}
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
			</form>
		</div>
	);
};

const LeadershipVolunteerExperienceForm = ({
	insertLeadershipVolunteerData,
	setinsertLeadershipVolunteerData,
}) => {
	// Handler to update form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setinsertLeadershipVolunteerData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<div>Add your leadership / volunteer experience</div>
			<br></br>
			<div>Leadership / Volunteer Experience 1</div>
			<form>
				<div>
					Company
					<input
						name="company"
						value={insertLeadershipVolunteerData.company}
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
						value={insertLeadershipVolunteerData.location}
						onChange={handleChange}
						placeholder="Enter your location"
						required
					/>
				</div>
				<br />
				<div>
					Position Title
					<input
						name="position"
						value={insertLeadershipVolunteerData.position}
						onChange={handleChange}
						placeholder="Enter your position"
						required
					/>
				</div>
				<br />
				<div>
					Experience Type
					<input
						name="experiencetype"
						value={insertLeadershipVolunteerData.experiencetype}
						onChange={handleChange}
						placeholder="Enter your experiencetype"
						required
					/>
				</div>
				<br />
				<div>
					Start Month
					<input
						name="startmonth"
						value={insertLeadershipVolunteerData.startmonth}
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
						value={insertLeadershipVolunteerData.startyear}
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
						value={insertLeadershipVolunteerData.endmonth}
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
						value={insertLeadershipVolunteerData.endyear}
						onChange={handleChange}
						placeholder="Enter your end year"
						required
					/>
				</div>
				<div>I currently work here</div>
				<br />
				<div>
					Description
					<br></br>
					<textarea
						name="other"
						value={insertLeadershipVolunteerData.other}
						onChange={handleChange}
						placeholder="Enter any other information"
						row={5}
						col={25}
						required
					/>
				</div>
				<div>Add Leadership / Volunteer Experience</div>
				<br />
			</form>
		</div>
	);
};

const EducationForm = ({ insertEducationData, setInsertEducationData }) => {
	// Handler to update form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInsertEducationData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<div>Add your education history </div>
			<br></br>
			<div>Education 1</div>
			<form>
				<div>
					School Name
					<input
						name="school"
						value={insertEducationData.school}
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
						value={insertEducationData.major}
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
						value={insertEducationData.degreetype}
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
						value={insertEducationData.GPA}
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
						value={insertEducationData.startmonth}
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
						value={insertEducationData.startyear}
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
						value={insertEducationData.endmonth}
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
						value={insertEducationData.endyear}
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
						value={insertEducationData.other}
						onChange={handleChange}
						placeholder="Enter any other information"
						required
					/>
				</div>
				<div>Add Education</div>
				<br />
			</form>
		</div>
	);
};

const ProjectsForm = ({ insertProjectData, setinsertProjectData }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setinsertProjectData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<div>Add your projects</div>
			<br></br>
			<div>Project 1</div>
			<form>
				<div>
					Company
					<input
						name="company"
						value={insertProjectData.company}
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
						value={insertProjectData.location}
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
						value={insertProjectData.startmonth}
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
						value={insertProjectData.startyear}
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
						value={insertProjectData.endmonth}
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
						value={insertProjectData.endyear}
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
						value={insertProjectData.other}
						onChange={handleChange}
						placeholder="Enter any other information"
						row={5}
						col={25}
						required
					/>
				</div>
				<div>Add a Project</div>
				<br />
			</form>
		</div>
	);
};

const SkillsForm = ({
	insertSkills1Form,
	setInsertSkills1Form,
	insertSkills2Form,
	setInsertSkills2Form,
}) => {
	const [selectedSkill, setSelectedSkill] = useState('');

	const handleChange1 = (e) => {
		const { name, value } = e.target;
		setInsertSkills1Form((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleChange2 = (e) => {
		const { name, value } = e.target;
		setInsertSkills2Form((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// Handler to update the state based on selection
	const handleSelection = (e) => {
		setSelectedSkill(e.target.value);
	};

	return (
		<div>
			<div>Finally, add your skills!</div>
			<br></br>

			{/* option selector for the skill choice, maybe this is not need*/}
			<div>
				<form>
					<label htmlFor="skills">Skill Options: </label>
					<select
						name="skills"
						id="skills"
						onChange={handleSelection}
					>
						<option value="technical">Technical Skills</option>
						<option value="business">Business Skills</option>
					</select>
				</form>
			</div>

			{/* Conditionally render the JSX based on selectedSkill */}

			{selectedSkill === '' && (
				<div>
					<br></br>

					<form>
						<div>
							Coding Languages
							<input
								name="codinglanguages"
								value={insertSkills1Form.codinglanguages}
								onChange={handleChange1}
								placeholder="Enter your coding languages"
								required
							/>
						</div>
						<br />
						<div>
							Programming Concepts
							<input
								name="programmingconcepts"
								value={insertSkills1Form.programmingconcepts}
								onChange={handleChange1}
								placeholder="Enter your programming concepts"
								required
							/>
						</div>
						<br />
						<div>
							Tools / Applications
							<input
								name="tools"
								value={insertSkills1Form.tools}
								onChange={handleChange1}
								placeholder="Enter your tools / applications"
								required
							/>
						</div>
						<br />
						<div>
							Frameworks
							<input
								name="frameworks"
								value={insertSkills1Form.frameworks}
								onChange={handleChange1}
								placeholder="Enter your frameworks"
								required
							/>
						</div>
						<br />
					</form>
				</div>
			)}

			{selectedSkill === 'technical' && (
				<div>
					<br></br>

					<form>
						<div>
							Coding Languages
							<input
								name="codinglanguages"
								value={insertSkills1Form.codinglanguages}
								onChange={handleChange1}
								placeholder="Enter your coding languages"
								required
							/>
						</div>
						<br />
						<div>
							Programming Concepts
							<input
								name="programmingconcepts"
								value={insertSkills1Form.programmingconcepts}
								onChange={handleChange1}
								placeholder="Enter your programming concepts"
								required
							/>
						</div>
						<br />
						<div>
							Tools / Applications
							<input
								name="tools"
								value={insertSkills1Form.tools}
								onChange={handleChange1}
								placeholder="Enter your tools / applications"
								required
							/>
						</div>
						<br />
						<div>
							Frameworks
							<input
								name="frameworks"
								value={insertSkills1Form.frameworks}
								onChange={handleChange1}
								placeholder="Enter your frameworks"
								required
							/>
						</div>
						<br />
					</form>
				</div>
			)}

			{selectedSkill === 'business' && (
				<div>
					<br></br>

					<form>
						<div>
							Business Communications
							<input
								name="businesscommunications"
								value={insertSkills2Form.businesscommunications}
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
								value={insertSkills2Form.leadershipskills}
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
								value={insertSkills2Form.projectmanagement}
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
								value={insertSkills2Form.frameworks}
								onChange={handleChange2}
								placeholder="Enter your technical / data analysis knowledge"
								required
							/>
						</div>
						<br />
					</form>
				</div>
			)}
		</div>
	);
};

const WorkExperienceForm = ({ insertWorkData, setInsertWorkData }) => {
	// Handler to update form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInsertWorkData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<div>Add your work experience</div>
			<br></br>
			<div>Work Experience 1</div>
			<form>
				<div>
					Company
					<input
						name="company"
						value={insertWorkData.company}
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
						value={insertWorkData.location}
						onChange={handleChange}
						placeholder="Enter your location"
						required
					/>
				</div>
				<br />
				<div>
					Position Title
					<input
						name="position"
						value={insertWorkData.position}
						onChange={handleChange}
						placeholder="Enter your position"
						required
					/>
				</div>
				<br />
				<div>
					Experience Type
					<input
						name="experiencetype"
						value={insertWorkData.experiencetype}
						onChange={handleChange}
						placeholder="Enter your experiencetype"
						required
					/>
				</div>
				<br />
				<div>
					Start Month
					<input
						name="startmonth"
						value={insertWorkData.startmonth}
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
						value={insertWorkData.startyear}
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
						value={insertWorkData.endmonth}
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
						value={insertWorkData.endyear}
						onChange={handleChange}
						placeholder="Enter your end year"
						required
					/>
				</div>
				<div>I currently work here</div>
				<br />
				<div>
					Description
					<br></br>
					<textarea
						name="other"
						value={insertWorkData.other}
						onChange={handleChange}
						placeholder="Enter any other information"
						row={5}
						col={25}
						required
					/>
				</div>
				<div>Add Work Experience</div>
				<br />
			</form>
		</div>
	);
};

// boiler for UserType form

// const PreferencesStep = ({ preferences, setPreferences }) => {
//   const handlePreferenceChange = (preference) => {
//     const newPreferences = preferences.includes(preference)
//       ? preferences.filter((pref) => pref !== preference)
//       : [...preferences, preference];

//     setPreferences(newPreferences);
//   };

//   return (
//     <div>
//       <h2>Step 3: Choose Your Preferences</h2>
//       <label>
//         <input
//           type="checkbox"
//           checked={preferences.includes('Option 1')}
//           onChange={() => handlePreferenceChange('Option 1')}
//         />
//         Option 1
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={preferences.includes('Option 2')}
//           onChange={() => handlePreferenceChange('Option 2')}
//         />
//         Option 2
//       </label>
//     </div>
//   );
// };

const SummaryStep = ({
	insertNewData,
	insertEducationData,
	insertWorkData,
	insertLeadershipVolunteerData,
	insertProjectData,
	insertSkills1Form,
	insertSkills2Form,
}) => {
	console.log('this insertNewData.firstname', insertNewData.firstname);
	console.log('this lastname', insertNewData.firstname);
	console.log('this insertNewData.firstname', insertNewData.lastname);
	console.log('this insertNewData.firstname', insertNewData.email);

	return (
		<div>
			<h1>Summary</h1>

			<br></br>

			<h2>Contact Info</h2>
			<ul>First Name: {insertNewData.firstname}</ul>
			<ul>Last Name: {insertNewData.lastname}</ul>
			<ul>Email: {insertNewData.email}</ul>
			<ul>LinkedIn: {insertNewData.linkedin}</ul>
			<ul>Personal Website: {insertNewData.personalwebsite}</ul>
			<ul>Github: {insertNewData.github}</ul>
			<ul>Location: {insertNewData.location}</ul>
			<ul>Personal Summary: {insertNewData.personalsummary}</ul>

			<br />

			<h2>Education Info</h2>
			<ul>School Name: {insertEducationData.school}</ul>
			<ul>Major: {insertEducationData.major}</ul>
			<ul>Degree Type: {insertEducationData.degreetype}</ul>
			<ul>GPA: {insertEducationData.GPA}</ul>
			<ul>Start Month: {insertEducationData.startmonth}</ul>
			<ul>Start Year: {insertEducationData.startyear}</ul>
			<ul>End Month: {insertEducationData.endmonth}</ul>
			<ul>End Year: {insertEducationData.endyear}</ul>
			<ul>
				Courses Taken / Concepts Learned / Scholarships / Other:{' '}
				{insertEducationData.other}
			</ul>

			<br />

			<h2>Work Info</h2>
			<ul>Company: {insertWorkData.company}</ul>
			<ul>Location: {insertWorkData.location}</ul>
			<ul>Position: {insertWorkData.position}</ul>
			<ul>Experience Type: {insertWorkData.experiencetype}</ul>
			<ul>Start Month: {insertWorkData.startmonth}</ul>
			<ul>Start Year: {insertWorkData.startyear}</ul>
			<ul>End Month: {insertWorkData.endmonth}</ul>
			<ul>End Year: {insertWorkData.endyear}</ul>
			<ul>Other: {insertWorkData.other}</ul>

			<br />

			<h2>Leadership & Volunteer Info</h2>
			<ul>Company: {insertLeadershipVolunteerData.company}</ul>
			<ul>Location: {insertLeadershipVolunteerData.location}</ul>
			<ul>Position: {insertLeadershipVolunteerData.position}</ul>
			<ul>Experience Type: {insertLeadershipVolunteerData.experiencetype}</ul>
			<ul>Start Month: {insertLeadershipVolunteerData.startmonth}</ul>
			<ul>Start Year: {insertLeadershipVolunteerData.startyear}</ul>
			<ul>End Month: {insertLeadershipVolunteerData.endmonth}</ul>
			<ul>End Year: {insertLeadershipVolunteerData.endyear}</ul>
			<ul>Other: {insertLeadershipVolunteerData.other}</ul>

			<br />

			<h2>Project Info</h2>
			<ul>Company: {insertProjectData.company}</ul>
			<ul>Location: {insertProjectData.location}</ul>
			<ul>Start Month: {insertProjectData.startmonth}</ul>
			<ul>Start Year: {insertProjectData.startyear}</ul>
			<ul>End Month: {insertProjectData.endmonth}</ul>
			<ul>End Year: {insertProjectData.endyear}</ul>
			<ul>Other: {insertProjectData.other}</ul>

			<br />

			<h2>Skills - Section 1</h2>
			<ul>Coding Languages: {insertSkills1Form.codinglanguages}</ul>
			<ul>Programming Concepts: {insertSkills1Form.programmingconcepts}</ul>
			<ul>Tools: {insertSkills1Form.tools}</ul>
			<ul>Frameworks: {insertSkills1Form.frameworks}</ul>

			<br />

			<h2>Skills - Section 2</h2>
			<ul>
				Business Communications: {insertSkills2Form.businesscommunications}
			</ul>
			<ul>Leadership: {insertSkills2Form.leadership}</ul>
			<ul>Project Management: {insertSkills2Form.projectmanagement}</ul>
			<ul>Technical: {insertSkills2Form.technical}</ul>

			<br />
		</div>
	);
};
