'use client';

// uses this chatgpt as inspiration https://chatgpt.com/share/675a02af-58d0-8008-9e32-44fe262a0f04

import React, { useState } from 'react';
import { createClient } from '../../../app/supabase/client';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
		'Projects',
		'Skills',
		'Review',
	];
	const progressPercent = ((step + 1) / stepProgressTitles.length) * 100;
	const stepInstructionTitle = [
		'Welcome to StackAI! To get started, tell us a little bit about yourself',
		'Add your education history',
		'Add your work experience',
		'Add your leadership/volunteer experience',
		'Add your projects',
		'Finally, add your skills',
		'Review your profile',
	];
	const stepInstructionDescription = [
		'Please enter as much information as possible. The more information, the better the result.',
		'',
		'',
		'',
		'',
		'',
		'Please review your profile information and go back if you need to fix anything.',
	];

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
		// <div className="bg-gray-200 min-h-screen flex items-center justify-center">
		<div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center p-10">
			<h1>STACK AI</h1>
			<Card className="w-full max-w-[1200px] p-10">
				<CardHeader>
					<div className="space-y-6">
						<div className="flex justify-between text-sm font-medium mb-2">
							{stepProgressTitles.map((title, idx) => (
								<div
									key={idx}
									className="text-center w-full"
								>
									<span
										className={`${
											idx <= step ? 'text-gray-950' : 'text-gray-400'
										}`}
									>
										{title}
									</span>
								</div>
							))}
						</div>
						<Progress
							value={progressPercent}
							className="h-2 rounded-full w-full"
						/>
					</div>
					<CardTitle className="pt-5">{stepInstructionTitle[step]}</CardTitle>
					<CardDescription className="pb-5">
						{stepInstructionDescription[step]}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{' '}
					<div>{steps[step]}</div>
				</CardContent>
				<CardFooter
					className="flex
					justify-center gap-4"
				>
					{step > 0 && (
						<Button
							variant="outline"
							className="w-1/3"
							onClick={prevStep}
						>
							Back
						</Button>
					)}
					{step < steps.length - 1 && (
						<Button
							className="w-1/3"
							onClick={nextStep}
						>
							Next
						</Button>
					)}
					{step === steps.length - 1 && (
						// <button onClick={() => alert('Onboarding Complete!')}>Finish</button>
						// change to the below onSubmit that sends to DB
						<Button onClick={handleSubmit}>Finish</Button>
					)}
				</CardFooter>
			</Card>
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
			<div className="grid  grid-cols-2 w-full items-center gap-4">
				<div className="flex flex-col col-span-1 space-y-1.5">
					<p>First Name</p>
					<Input
						name="firstname"
						value={insertNewData.firstname}
						onChange={handleChange}
						placeholder="Enter your firstname"
						required
					/>
				</div>
				<div className="flex flex-col col-span-1 space-y-1.5">
					<p>Last Name</p>
					<Input
						name="lastname"
						value={insertNewData.lastname}
						onChange={handleChange}
						placeholder="Enter your lastname"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					Email
					<Input
						name="email"
						value={insertNewData.email}
						onChange={handleChange}
						placeholder="Enter your email"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					LinkedIn URL
					<Input
						name="linkedin"
						value={insertNewData.linkedin}
						onChange={handleChange}
						placeholder="Enter your LinkedIn"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					Personal Website URL
					<Input
						name="personalwebsite"
						value={insertNewData.personalwebsite}
						onChange={handleChange}
						placeholder="Enter your personalwebsite"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					Github URL
					<Input
						name="github"
						value={insertNewData.github}
						onChange={handleChange}
						placeholder="Enter your github"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					Location
					<Input
						name="location"
						value={insertNewData.location}
						onChange={handleChange}
						placeholder="Enter your location"
						required
					/>
				</div>
				<div className="flex flex-col col-span-2 space-y-1.5">
					Personal Summary
					<Textarea
						name="personalsummary"
						value={insertNewData.personalsummary}
						onChange={handleChange}
						placeholder="Enter your personal summary"
						required
					/>
				</div>
			</div>
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

	const handleRemoveEducation = () => {
		setInsertEducationData((prevData) => {
			if (prevData.length > 1) {
				return prevData.slice(0, -1);
			}
			return prevData;
		});
	};

	return (
		<div>
			{insertEducationData.map((education, index) => (
				<div key={index}>
					<p className="text-lg pt-5 pb-5">Education Experience {index + 1}</p>
					<div className="grid  grid-cols-4 w-full items-center gap-4">
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>School Name</label>
							<Input
								name="school"
								value={education.school}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your school"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Major</label>
							<Input
								name="major"
								value={education.major}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your major"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Degree Type</label>
							<Input
								name="degreetype"
								value={education.degreetype}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your degree type"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>GPA</label>
							<Input
								name="GPA"
								value={education.GPA}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your GPA"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Month</label>
							<Input
								name="startmonth"
								value={education.startmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your start month"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Year</label>
							<Input
								name="startyear"
								value={education.startyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your start year"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Month</label>
							<Input
								name="endmonth"
								value={education.endmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your end month"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Year</label>
							<Input
								name="endyear"
								value={education.endyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your end year"
								required
							/>
						</div>
						<div className="flex flex-col col-span-4 space-y-1.5">
							<label>
								Courses Taken / Concepts Learned / Scholarships / Other
							</label>
							<Input
								name="other"
								value={education.other}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter any other information"
								required
							/>
						</div>
					</div>
				</div>
			))}
			<Button
				variant="link"
				onClick={handleAddEducation}
				className="p-0"
			>
				+ Add Another Education Entry
			</Button>
			<Button
				variant="link"
				onClick={handleRemoveEducation}
				className="p-0 pl-5"
			>
				- Remove Latest Education Entry
			</Button>
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

	const handleRemoveWorkExperience = () => {
		setInsertWorkData((prevData) => {
			if (prevData.length > 1) {
				return prevData.slice(0, -1);
			}
			return prevData;
		});
	};

	return (
		<div>
			{insertWorkData.map((workexperience, index) => (
				<div key={index}>
					<p className="text-lg pt-5 pb-5">Work Experience {index + 1}</p>
					<div className="grid  grid-cols-4 w-full items-center gap-4">
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Company Name</label>
							<Input
								name="company"
								value={workexperience.company}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your company"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Location</label>
							<Input
								name="location"
								value={workexperience.location}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the location"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Position Title</label>
							<Input
								name="position"
								value={workexperience.position}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your position"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Experience Type</label>
							<Input
								name="experiencetype"
								value={workexperience.experiencetype}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your experience type"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Month</label>
							<Input
								name="startmonth"
								value={workexperience.startmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your start month"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Year</label>
							<Input
								name="startyear"
								value={workexperience.startyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your start year"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Month</label>
							<Input
								name="endmonth"
								value={workexperience.endmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your end month"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Year</label>
							<Input
								name="endyear"
								value={workexperience.endyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your end year"
								required
							/>
						</div>
						<div className="flex flex-col col-span-4 space-y-1.5">
							<label>Description</label>
							<Textarea
								name="other"
								value={workexperience.other}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter any other information"
								row={5}
								col={25}
								required
							/>
						</div>
					</div>
				</div>
			))}
			<Button
				variant="link"
				onClick={handleAddWorkExperience}
				className="p-0"
			>
				+ Add Another Work Experience
			</Button>
			<Button
				variant="link"
				onClick={handleRemoveWorkExperience}
				className="p-0 pl-5"
			>
				- Remove Latest Education Entry
			</Button>
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
