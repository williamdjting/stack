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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
		<div className="bg-skyblue min-h-screen flex flex-col items-center justify-center p-10">
			<h1>Stack AI</h1>
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
							className="h-2 rounded-full w-full [&>div]:bg-skyblue-800"
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
							variant="skyblue"
						>
							Next
						</Button>
					)}
					{step === steps.length - 1 && (
						<Button
							onClick={handleSubmit}
							className="w-1/3"
							variant="skyblue"
						>
							Finish
						</Button>
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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
						className="focus-visible:ring-skyblue"
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

	const handleRemoveLeadershipVolunteer = () => {
		setinsertLeadershipVolunteerData((prevData) => {
			if (prevData.length > 1) {
				return prevData.slice(0, -1);
			}
			return prevData;
		});
	};

	return (
		<div>
			{insertLeadershipVolunteerData.map((leadershipvolunteer, index) => (
				<div key={index}>
					<p className="text-lg pt-5 pb-5">Other Experience {index + 1}</p>
					<div className="grid  grid-cols-4 w-full items-center gap-4">
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Company Name</label>
							<Input
								name="company"
								value={leadershipvolunteer.company}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the company name"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Location</label>
							<Input
								name="location"
								value={leadershipvolunteer.location}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the location"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Position Title</label>
							<Input
								name="position"
								value={leadershipvolunteer.position}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your position"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-2 space-y-1.5">
							<label>Experience Type</label>
							<Input
								name="experiencetype"
								value={leadershipvolunteer.experiencetype}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter your experience type"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Month</label>
							<Input
								name="startmonth"
								value={leadershipvolunteer.startmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the start month"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Year</label>
							<Input
								name="startyear"
								value={leadershipvolunteer.startyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the start year"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Month</label>
							<Input
								name="endmonth"
								value={leadershipvolunteer.endmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the end month"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Year</label>
							<Input
								name="endyear"
								value={leadershipvolunteer.endyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the end year"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-4 space-y-1.5">
							<label>Description</label>
							<Textarea
								name="other"
								value={insertLeadershipVolunteerData.other}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter any other information"
								className="focus-visible:ring-skyblue"
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
				onClick={handleAddLeadershipVolunteer}
				className="p-0"
			>
				+ Add Leadership / Volunteer Experience
			</Button>
			<Button
				variant="link"
				onClick={handleRemoveLeadershipVolunteer}
				className="p-0 pl-5"
			>
				- Remove Latest Leadership / Volunteer Entry
			</Button>
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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

	const handleRemoveProjects = () => {
		setinsertProjectData((prevData) => {
			if (prevData.length > 1) {
				return prevData.slice(0, -1);
			}
			return prevData;
		});
	};

	return (
		<div>
			<br></br>
			{insertProjectData.map((projects, index) => (
				<div key={index}>
					<p className="text-lg pt-5 pb-5">Project {index + 1}</p>
					<div className="grid  grid-cols-4 w-full items-center gap-4">
						<div className="flex flex-col col-span-4 space-y-1.5">
							<label>Company Name</label>
							<Input
								name="company"
								value={projects.company}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the company name"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Month</label>
							<Input
								name="startmonth"
								value={projects.startmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the start month"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>Start Year</label>
							<Input
								name="startyear"
								value={projects.startyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the start year"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Month</label>
							<Input
								name="endmonth"
								value={projects.endmonth}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the end month"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5">
							<label>End Year</label>
							<Input
								name="endyear"
								value={projects.endyear}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter the end year"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-4 space-y-1.5">
							<label>Description</label>
							<Textarea
								name="other"
								value={projects.other}
								onChange={(e) => handleChange(index, e)}
								placeholder="Enter any other information"
								className="focus-visible:ring-skyblue"
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
				onClick={handleAddProjects}
				className="p-0"
			>
				+ Add Projects
			</Button>
			<Button
				variant="link"
				onClick={handleRemoveProjects}
				className="p-0 pl-5"
			>
				+ Remove Latest Project
			</Button>
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
	const handleSelection = (value) => {
		setSelectedSkill(value);
	};

	return (
		<div>
			<br></br>

			{/* option selector for the skill choice, maybe this is not need*/}
			<div>
				<form>
					<label htmlFor="skills">Skill Options: </label>
					<Select
						name="skills"
						id="skills"
						onValueChange={handleSelection}
					>
						<SelectTrigger className="w-[180px] focus:outline-none focus:ring-0 focus:ring-offset-0">
							<SelectValue placeholder="Skills" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="technical">Technical Skills</SelectItem>
							<SelectItem value="business">Business Skills</SelectItem>
						</SelectContent>
					</Select>
				</form>
			</div>

			{/* Conditionally render the JSX based on selectedSkill */}

			{selectedSkill === '' && (
				<div className="grid  grid-cols-1 w-full items-center gap-4">
					<form>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Coding Languages
							<Input
								name="codinglanguages"
								value={insertSkills1Form.codinglanguages}
								onChange={handleChange1}
								placeholder="Enter your coding languages"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Programming Concepts
							<Input
								name="programmingconcepts"
								value={insertSkills1Form.programmingconcepts}
								onChange={handleChange1}
								placeholder="Enter your programming concepts"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Tools / Applications
							<Input
								name="tools"
								value={insertSkills1Form.tools}
								onChange={handleChange1}
								placeholder="Enter your tools / applications"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Frameworks
							<Input
								name="frameworks"
								value={insertSkills1Form.frameworks}
								onChange={handleChange1}
								placeholder="Enter your frameworks"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
					</form>
				</div>
			)}

			{selectedSkill === 'technical' && (
				<div className="grid  grid-cols-1 w-full items-center gap-4">
					<form>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Coding Languages
							<Input
								name="codinglanguages"
								value={insertSkills1Form.codinglanguages}
								onChange={handleChange1}
								placeholder="Enter your coding languages"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Programming Concepts
							<Input
								name="programmingconcepts"
								value={insertSkills1Form.programmingconcepts}
								onChange={handleChange1}
								placeholder="Enter your programming concepts"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Tools / Applications
							<Input
								name="tools"
								value={insertSkills1Form.tools}
								onChange={handleChange1}
								placeholder="Enter your tools / applications"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Frameworks
							<Input
								name="frameworks"
								value={insertSkills1Form.frameworks}
								onChange={handleChange1}
								placeholder="Enter your frameworks"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
					</form>
				</div>
			)}

			{selectedSkill === 'business' && (
				<div className="grid  grid-cols-1 w-full items-center gap-4">
					<form>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Business Communications
							<Input
								name="businesscommunications"
								value={insertSkills2Form.businesscommunications}
								onChange={handleChange2}
								placeholder="Enter your business communications"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Leadership / Case Competition
							<Input
								name="leadership"
								value={insertSkills2Form.leadershipskills}
								onChange={handleChange2}
								placeholder="Enter your leadership / case competition skills"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Project Management
							<Input
								name="projectmanagement"
								value={insertSkills2Form.projectmanagement}
								onChange={handleChange2}
								placeholder="Enter your project management"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
						<div className="flex flex-col col-span-1 space-y-1.5 pt-5">
							Technical / Data Analysis Knowledge
							<Input
								name="technical"
								value={insertSkills2Form.frameworks}
								onChange={handleChange2}
								placeholder="Enter your technical / data analysis knowledge"
								className="focus-visible:ring-skyblue"
								required
							/>
						</div>
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
								className="focus-visible:ring-skyblue"
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
				- Remove Latest Work Entry
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
			<div className="grid  grid-cols-4 w-full items-center gap-4">
				<p className="text-lg flex flex-col col-span-4 space-y-1.5">
					Personal Info
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					First Name: {insertNewData.firstname}
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					Last Name: {insertNewData.lastname}
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					Email: {insertNewData.email}
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					LinkedIn: {insertNewData.linkedin}
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					Personal Website: {insertNewData.personalwebsite}
				</p>
				<p className="flex flex-col col-span-2 space-y-1.5">
					Github: {insertNewData.github}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Location: {insertNewData.location}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Personal Summary: {insertNewData.personalsummary}
				</p>
			</div>
			<p className="text-lg pt-5 pb-2 flex flex-col col-span-4 space-y-1.5">
				Education Info
			</p>
			{insertEducationData.length > 0 ? (
				insertEducationData.map((education, index) => (
					<div key={index}>
						<div className="grid  grid-cols-4 w-full items-center gap-4">
							<p className="flex flex-col col-span-4 space-y-1.5">
								Education {index + 1}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								School Name: {education.school}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Major: {education.major}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Degree Type: {education.degreetype}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								GPA: {education.GPA}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Month: {education.startmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Year: {education.startyear}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Month: {education.endmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Year: {education.endyear}
							</p>
							<p className="flex flex-col col-span-4 space-y-1.5">
								Courses Taken / Concepts Learned / Scholarships / Other:{' '}
								{education.other}
							</p>
						</div>
					</div>
				))
			) : (
				<p>No Education data available.</p>
			)}
			<p className="text-lg pt-5 pb-2 flex flex-col col-span-4 space-y-1.5">
				Work Info
			</p>
			{insertWorkData.length > 0 ? (
				insertWorkData.map((workexperience, index) => (
					<div key={index}>
						<div className="grid  grid-cols-4 w-full items-center gap-4">
							<p className="flex flex-col col-span-4 space-y-1.5">
								Work Experience {index + 1}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Company: {workexperience.company}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Location: {workexperience.location}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Position: {workexperience.position}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Experience Type: {workexperience.experiencetype}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Month: {workexperience.startmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Year: {workexperience.startyear}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Month: {workexperience.endmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Year: {workexperience.endyear}
							</p>
							<p className="flex flex-col col-span-4 space-y-1.5">
								Other: {workexperience.other}
							</p>
						</div>
					</div>
				))
			) : (
				<p>No Work Experience data available.</p>
			)}
			<p className="text-lg pt-5 pb-2 flex flex-col col-span-4 space-y-1.5">
				Leadership & Volunteer Info
			</p>
			{insertLeadershipVolunteerData.length > 0 ? (
				insertLeadershipVolunteerData.map((leadershipvolunteer, index) => (
					<div key={index}>
						<div className="grid  grid-cols-4 w-full items-center gap-4">
							<p className="text-lg pt-5 flex flex-col col-span-4 space-y-1.5">
								Leadership & Volunteer Info
							</p>
							<p className="flex flex-col col-span-4 space-y-1.5">
								Leadership & Volunteer {index + 1}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Company: {leadershipvolunteer.company}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Location: {leadershipvolunteer.major}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Position: {leadershipvolunteer.position}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Experience Type: {leadershipvolunteer.experiencetype}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Month: {leadershipvolunteer.startmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Year: {leadershipvolunteer.startyear}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Month: {leadershipvolunteer.endmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Year: {leadershipvolunteer.endyear}
							</p>
							<p className="flex flex-col col-span-4 space-y-1.5">
								Other: {leadershipvolunteer.other}
							</p>
						</div>
					</div>
				))
			) : (
				<p>No Leadership and Volunteer data available.</p>
			)}
			<p className="text-lg pt-5 pb-2 flex flex-col col-span-4 space-y-1.5">
				Project Info
			</p>
			{insertProjectData.length > 0 ? (
				insertProjectData.map((projects, index) => (
					<div key={index}>
						<div className="grid  grid-cols-4 w-full items-center gap-4">
							<p className="flex flex-col col-span-4 space-y-1.5">
								Project {index + 1}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Company: {projects.company}
							</p>
							<p className="flex flex-col col-span-2 space-y-1.5">
								Location: {projects.location}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Month: {projects.startmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								Start Year: {projects.startyear}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Month: {projects.endmonth}
							</p>
							<p className="flex flex-col col-span-1 space-y-1.5">
								End Year: {projects.endyear}
							</p>
							<p className="flex flex-col col-span-4 space-y-1.5">
								Other: {projects.other}
							</p>
						</div>
					</div>
				))
			) : (
				<p>No Project data available.</p>
			)}

			<div className="grid  grid-cols-4 w-full items-center gap-4">
				<p className="text-lg pt-5 flex flex-col col-span-4 space-y-1.5">
					Skills - Section 1
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">Technical Skills</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Coding Languages: {insertSkills1Form.codinglanguages}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Programming Concepts: {insertSkills1Form.programmingconcepts}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Tools: {insertSkills1Form.tools}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Frameworks: {insertSkills1Form.frameworks}
				</p>

				<p className="text-lg pt-5 flex flex-col col-span-4 space-y-1.5">
					Skills - Section 2
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">Business Skills</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Business Communications: {insertSkills2Form.businesscommunications}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Leadership: {insertSkills2Form.leadership}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Project Management: {insertSkills2Form.projectmanagement}
				</p>
				<p className="flex flex-col col-span-4 space-y-1.5">
					Technical: {insertSkills2Form.technical}
				</p>
			</div>
		</div>
	);
};
