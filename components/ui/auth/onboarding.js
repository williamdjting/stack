'use client';

// uses this chatgpt as inspiration https://chatgpt.com/share/675a02af-58d0-8008-9e32-44fe262a0f04

import React, { useState } from 'react';
import { createClient } from '../../../app/supabase/client';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const supabase = createClient();

export function OnboardingFlow() {
	const router = useRouter();
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

	const [insertEducationData, setInsertEducationData] = useState([
		{
			school: '',
			major: '',
			degreetype: '',
			GPA: '',
			startmonth: '',
			startyear: '',
			endmonth: '',
			endyear: '',
			other: '',
		},
	]);

	const [insertLeadershipVolunteerData, setinsertLeadershipVolunteerData] =
		useState([
			{
				company: '',
				location: '',
				position: '',
				experiencetype: '',
				startmonth: '',
				startyear: '',
				endmonth: '',
				endyear: '',
				other: '',
			},
		]);

	const [insertProjectData, setinsertProjectData] = useState([
		{
			company: '',
			location: '',
			startmonth: '',
			startyear: '',
			endmonth: '',
			endyear: '',
			other: '',
		},
	]);

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

	const [insertWorkData, setInsertWorkData] = useState([
		{
			company: '',
			location: '',
			position: '',
			experiencetype: '',
			startmonth: '',
			startyear: '',
			endmonth: '',
			endyear: '',
			other: '',
		},
	]);

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
				education: insertEducationData,
				workexperience: insertWorkData,
				leadershipvolunteer: insertLeadershipVolunteerData,
				projects: insertProjectData,
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

		router.push('/dashboard');
		if (error) {
			console.error('Insert error:', error);
		}

		console.log('this is handleSubmit');
	};

	const stepProgressTitles = [
		'About you',
		'Education',
		'Work Experience',
		'Other Experience',
		'Skills',
	];
	const progressPercent = ((step + 1) / stepProgressTitles.length) * 100;

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
			<div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
				<h3>TEST</h3>
				<div className="flex justify-between text-sm font-medium mb-2">
					{stepProgressTitles.map((title, idx) => (
						<div
							key={idx}
							className="text-center w-full"
						>
							<span
								className={`${idx <= step ? 'text-blue-600' : 'text-gray-400'}`}
							>
								{title}
							</span>
						</div>
					))}
				</div>
				<Progress
					value={progressPercent}
					className="h-2 rounded-full"
				/>
			</div>
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
	const handleChange = (index, e) => {
		const { name, value } = e.target;
		const updatedLeadershipVolunteer = [...insertLeadershipVolunteerData];
		updatedLeadershipVolunteer[index] = {
			...updatedLeadershipVolunteer[index],
			[name]: value,
		};
		setinsertLeadershipVolunteerData(updatedLeadershipVolunteer);
	};

	const handleAddLeadershipVolunteer = () => {
		setinsertLeadershipVolunteerData([
			...insertLeadershipVolunteerData,
			{
				company: '',
				location: '',
				position: '',
				experiencetype: '',
				startmonth: '',
				startyear: '',
				endmonth: '',
				endyear: '',
				other: '',
			},
		]);
	};

	return (
		<div>
			<h1>Add your leadership / volunteer experience</h1>
			<br></br>
			{insertLeadershipVolunteerData.map((leadershipvolunteer, index) => (
				<div key={index}>
					<div>
						<label>Company Name</label>
						<input
							name="company"
							value={leadershipvolunteer.company}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the company name"
							required
						/>
					</div>
					<br />
					<div>
						<label>Location</label>
						<input
							name="location"
							value={leadershipvolunteer.location}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the location"
							required
						/>
					</div>
					<br />
					<div>
						<label>Position Title</label>
						<input
							name="position"
							value={leadershipvolunteer.position}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your position"
							required
						/>
					</div>
					<br />
					<div>
						<label>Experience Type</label>
						<input
							name="experiencetype"
							value={leadershipvolunteer.experiencetype}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your experience type"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Month</label>
						<input
							name="startmonth"
							value={leadershipvolunteer.startmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the start month"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Year</label>
						<input
							name="startyear"
							value={leadershipvolunteer.startyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the start year"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Month</label>
						<input
							name="endmonth"
							value={leadershipvolunteer.endmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the endmonth"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Year</label>
						<input
							name="endyear"
							value={leadershipvolunteer.endyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the end year"
							required
						/>
					</div>
					<br />
					<div>
						<label>Description</label>
						<textarea
							name="other"
							value={insertLeadershipVolunteerData.other}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter any other information"
							row={5}
							col={25}
							required
						/>
					</div>
					<br />
				</div>
			))}
			<button
				type="button"
				onClick={handleAddLeadershipVolunteer}
			>
				Add Leadership / Volunteer Experience
			</button>
		</div>
	);
};

const EducationForm = ({ insertEducationData, setInsertEducationData }) => {
	// Handler to update form data
	const handleChange = (index, e) => {
		const { name, value } = e.target;
		const updatedEducation = [...insertEducationData];
		updatedEducation[index] = { ...updatedEducation[index], [name]: value };
		setInsertEducationData(updatedEducation);
	};

	const handleAddEducation = () => {
		setInsertEducationData([
			...insertEducationData,
			{
				school: '',
				major: '',
				degreetype: '',
				GPA: '',
				startmonth: '',
				startyear: '',
				endmonth: '',
				endyear: '',
				other: '',
			},
		]);
	};

	return (
		<div>
			<h1>Add your education history </h1>
			{insertEducationData.map((education, index) => (
				<div key={index}>
					<div>
						<label>School Name</label>
						<input
							name="school"
							value={education.school}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your school"
							required
						/>
					</div>
					<br />
					<div>
						<label>Major</label>
						<input
							name="major"
							value={education.major}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your major"
							required
						/>
					</div>
					<br />
					<div>
						<label>Degree Type</label>
						<input
							name="degreetype"
							value={education.degreetype}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your degree type"
							required
						/>
					</div>
					<br />
					<div>
						<label>GPA</label>
						<input
							name="GPA"
							value={education.GPA}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your GPA"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Month</label>
						<input
							name="startmonth"
							value={education.startmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your start month"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Year</label>
						<input
							name="startyear"
							value={education.startyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your start year"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Month</label>
						<input
							name="endmonth"
							value={education.endmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your end month"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Year</label>
						<input
							name="endyear"
							value={education.endyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your end year"
							required
						/>
					</div>
					<br />
					<div>
						<label>
							Courses Taken / Concepts Learned / Scholarships / Other
						</label>
						<input
							name="other"
							value={education.other}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter any other information"
							required
						/>
					</div>
				</div>
			))}
			<button
				type="button"
				onClick={handleAddEducation}
			>
				Add Another Education Entry;
			</button>
		</div>
	);
};

const ProjectsForm = ({ insertProjectData, setinsertProjectData }) => {
	const handleChange = (index, e) => {
		const { name, value } = e.target;
		const updatedProjects = [...insertProjectData];
		updatedProjects[index] = { ...updatedProjects[index], [name]: value };
		setinsertProjectData(updatedProjects);
	};

	const handleAddProjects = () => {
		setinsertProjectData([
			...insertProjectData,
			{
				company: '',
				location: '',
				startmonth: '',
				startyear: '',
				endmonth: '',
				endyear: '',
				other: '',
			},
		]);
	};

	return (
		<div>
			<h1>Add your projects</h1>
			<br></br>
			{insertProjectData.map((projects, index) => (
				<div key={index}>
					<div>
						<label>Company Name</label>
						<input
							name="company"
							value={projects.company}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the company name"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Month</label>
						<input
							name="startmonth"
							value={projects.startmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the start month"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Year</label>
						<input
							name="startyear"
							value={projects.startyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the start year"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Month</label>
						<input
							name="endmonth"
							value={projects.endmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the end month"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Year</label>
						<input
							name="endyear"
							value={projects.endyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the end year"
							required
						/>
					</div>
					<br />
					<div>
						<label>Description</label>
						<br />
						<textarea
							name="other"
							value={projects.other}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter any other information"
							row={5}
							col={25}
							required
						/>
					</div>
					<br />
				</div>
			))}
			<button
				type="type"
				onClick={handleAddProjects}
			>
				Add Projects
			</button>
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
	const handleChange = (index, e) => {
		const { name, value } = e.target;
		const updatedWorkExperience = [...insertWorkData];
		updatedWorkExperience[index] = {
			...updatedWorkExperience[index],
			[name]: value,
		};
		setInsertWorkData(updatedWorkExperience);
		// setInsertWorkData((prevFormData) => ({
		// 	...prevFormData,
		// 	[name]: value,
		// }));
	};

	const handleAddWorkExperience = () => {
		setInsertWorkData([
			...insertWorkData,
			{
				company: '',
				location: '',
				position: '',
				experiencetype: '',
				startmonth: '',
				startyear: '',
				endmonth: '',
				endyear: '',
				other: '',
			},
		]);
	};

	return (
		<div>
			<h1>Add your work experience</h1>
			{insertWorkData.map((workexperience, index) => (
				<div key={index}>
					<div>
						<label>Company Name</label>
						<input
							name="company"
							value={workexperience.company}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your company"
							required
						/>
					</div>
					<br />
					<div>
						<label>Location</label>
						<input
							name="location"
							value={workexperience.location}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter the location"
							required
						/>
					</div>
					<br />
					<div>
						<label>Position Title</label>
						<input
							name="position"
							value={workexperience.position}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your position"
							required
						/>
					</div>
					<br />
					<div>
						<label>Experience Type</label>
						<input
							name="experiencetype"
							value={workexperience.experiencetype}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your experience type"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Month</label>
						<input
							name="startmonth"
							value={workexperience.startmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your start month"
							required
						/>
					</div>
					<br />
					<div>
						<label>Start Year</label>
						<input
							name="startyear"
							value={workexperience.startyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your start year"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Month</label>
						<input
							name="endmonth"
							value={workexperience.endmonth}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your end month"
							required
						/>
					</div>
					<br />
					<div>
						<label>End Year</label>
						<input
							name="endyear"
							value={workexperience.endyear}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter your end year"
							required
						/>
					</div>
					<br />
					<div>
						<label>Description</label>
						<textarea
							name="other"
							value={workexperience.other}
							onChange={(e) => handleChange(index, e)}
							placeholder="Enter any other information"
							row={5}
							col={25}
							required
						/>
					</div>
					<br />
					<button
						type="button"
						onClick={handleAddWorkExperience}
					>
						Add Another Work Experience
					</button>
				</div>
			))}
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
			{insertEducationData.length > 0 ? (
				insertEducationData.map((education, index) => (
					<div key={index}>
						<h3>Education {index + 1}</h3>
						<ul>
							<li>School Name: {education.school}</li>
							<li>Major: {education.major}</li>
							<li>Degree Type: {education.degreetype}</li>
							<li>GPA: {education.GPA}</li>
							<li>Start Month: {education.startmonth}</li>
							<li>Start Year: {education.startyear}</li>
							<li>End Month: {education.endmonth}</li>
							<li>End Year: {education.endyear}</li>
							<li>
								Courses Taken / Concepts Learned / Scholarships / Other: :{' '}
								{education.other}
							</li>
						</ul>
					</div>
				))
			) : (
				<p>No Education data available.</p>
			)}

			<br />
			<h2>Work Info</h2>
			{insertWorkData.length > 0 ? (
				insertWorkData.map((workexperience, index) => (
					<div key={index}>
						<h3>Work Experience {index + 1}</h3>
						<ul>
							<li>Company: {workexperience.company}</li>
							<li>Location: {workexperience.location}</li>
							<li>Position: {workexperience.position}</li>
							<li>Experience Type: {workexperience.experiencetype}</li>
							<li>Start Month: {workexperience.startmonth}</li>
							<li>Start Year: {workexperience.startyear}</li>
							<li>End Month: {workexperience.endmonth}</li>
							<li>End Year: {workexperience.endyear}</li>
							<li>Other: {workexperience.other}</li>
						</ul>
					</div>
				))
			) : (
				<p>No Work Experience data available.</p>
			)}
			<br />
			<h2>Leadership & Volunteer Info</h2>
			{insertLeadershipVolunteerData.length > 0 ? (
				insertLeadershipVolunteerData.map((leadershipvolunteer, index) => (
					<div key={index}>
						<h3>Leadership & Volunteer {index + 1}</h3>
						<ul>
							<li>Company: {leadershipvolunteer.company}</li>
							<li>Location: {leadershipvolunteer.major}</li>
							<li>Position: {leadershipvolunteer.position}</li>
							<li>Experience Type: {leadershipvolunteer.experiencetype}</li>
							<li>Start Month: {leadershipvolunteer.startmonth}</li>
							<li>Start Year: {leadershipvolunteer.startyear}</li>
							<li>End Month: {leadershipvolunteer.endmonth}</li>
							<li>End Year: {leadershipvolunteer.endyear}</li>
							<li>Other: {leadershipvolunteer.other}</li>
						</ul>
					</div>
				))
			) : (
				<p>No Leadership and Volunteer data available.</p>
			)}

			<br />

			<h2>Project Info</h2>
			{insertProjectData.length > 0 ? (
				insertProjectData.map((projects, index) => (
					<div key={index}>
						<h3>Project {index + 1}</h3>
						<ul>
							<li>Company: {projects.company}</li>
							<li>Location: {projects.location}</li>
							<li>Start Month: {projects.startmonth}</li>
							<li>Start Year: {projects.startyear}</li>
							<li>End Month: {projects.endmonth}</li>
							<li>End Year: {projects.endyear}</li>
							<li>Other: {projects.other}</li>
						</ul>
					</div>
				))
			) : (
				<p>No Project data available.</p>
			)}
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
