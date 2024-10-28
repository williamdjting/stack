import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
// import { technicalskills_AI, education_AI, project_AI } from './openai_functions';
// import { executeAllSequentially } from './openai_functions'
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
	dangerouslyAllowBrowser: true, // Pass API key for authentication
	// new to fix the allow dangerous issue
	// need to protect the API key using https://chatgpt.com/share/67075d4f-24a8-8008-9637-32900bb98ef1
});

export const executeAI = async (param) => {
	console.log('inside executeai, line 16', param);

	const jobdescription = param.jobtitle;
	//     `Responsibilities
	// * Work with engineers across the company to build new features and products
	// * Work side-by-side with user-facing teams (Sales, Support) to best understand the needs of our customers
	// * Own problems end-to-end, thinking through everything from user experience, data models, scalability, operability, and ongoing metrics
	// * Be responsible for full software development lifecycle: design, development, testing, and operating in production
	// * Uphold our high engineering standards and bring consistency to the codebases, infrastructure, and processes you will encounter
	// * Serve as technical lead, contributing to and directing the execution of complex projects with other engineers
	// * Mentor software engineers and set the standard for the next generation of Brex engineers
	// * Design and implement experiments to improve our customers' experiences
	// * Proactively identify and prioritize improvements to the team’s processes, codebases, and best practices
	// Requirements
	// * 3+ years of experience architecting, developing, and testing client-side code
	// * Experience with modern web tooling and frameworks (such as TypeScript, React, Emotion, Apollo, Storybook, and Webpack)
	// * Familiarity with software engineering development cycles
	// * Ability to hold yourself and the team to high standards
	// * Strong communication and interpersonal skills
	// * Ability to provide in-depth evaluation of multiple technical directions and determine tradeoffs of each
	// * Strong propensity to make data-driven decisions on technical architecture and project prioritization
	// * English proficiency/fluency, both written and speaking (note: interviews will be conducted in English)
	// * Must be willing to work in office 2 days per week on Wednesday and Thursday, starting September 1st, 2025 when we open our Sao Paulo office
	// Bonus points
	// * Experience collaborating with experts in product, design, and operations
	// * Basic experience with design tools
	// * Experience driving initiatives at a broader level across an organization or company
	//   `
	const technicalskills_prompt = `You are a technical recruiter. You will be given a paragraph with information about an applicants techincal skills and should categorize it into the given data schema.
  //               If the answer is not detailed enough in certain fields, please modify it and elaborate with more detail. Please relate it to the ${jobdescription}. No sentences, short form only.`;

	const technicalskills_content = param.resumeskills;
	//   `C/C++, JavaScript (ES7), TypeScript, Python, HTML/CSS, SQL
	// // OOP, Relational DB, Web Development, Restful API, Systems Design, Networking, Testing, OS
	// // Git, Jira, Confluence, Docker, Postman, AWS, Bash, Pg Admin, NPM, Webpack, Component Libraries
	// // React, Node.js, Next.js, React Native, PostGres`

	const education_prompt = `You are a technical recruiter. 
            You will be given a paragraph with information about an applicants education history and should convert it into the given structure.
            If the answer is not detailed enough in certain fields, please modify it and elaborate with more detail. 
            If the answer is missing, please state that it is not specified.
            The user should have at least one education history stated.`;

	const education_content = param.resumeeducation;
	//   `Simon Fraser University, Burnaby, BC								   Sept 2021 - Present
	// Bachelor of Science in Computer Science
	// Minor in Mathematics
	// AWS Certified Developer - Associate (In Progress)`

	const project_prompt = `You are a technical recruiter. 
        //       You will be given a paragraph with information about an applicants projects and should convert it into the given structure.
        //       If the answer is not detailed enough in certain fields, please modify it and elaborate with more detail. 
        //       If the answer is missing, please state that it is not specified.   `;
	//       Please make the projects relevant and detailed to the job description: ${jobdescription}..`

	const project_content = param.resumeprojects;
	// `1. Data Visualization Dashboard:\n   -
	// Developed interactive dashboards using Tableau, resulting in a 30% increase in data accessibility for stakeholders.
	// \n   - Implemented real-time data processing with Apache Kafka, improving data refresh rates by 50%.\n   - Utilized SQL for data extraction and transformation, reducing query execution time by 40%.\n   - Collaborated with cross-functional teams to gather requirements, leading to a 25% reduction in project delivery time.\n\n2. Sales Forecasting Model:\n   - Built predictive models using Python and Scikit-learn, achieving an accuracy rate of 85% in sales predictions.\n   - Integrated time series analysis with ARIMA, enhancing forecast reliability by 20%.\n   - Employed data visualization techniques with Matplotlib to present forecasting results, improving stakeholder understanding by 35%.\n   -
	// Conducted A/B testing on different forecasting methods, resulting in a 15% increase in forecast precision.`

	const workexperience_prompt = `You are a technical recruiter. 
        You will be given multiple paragraphs with information about an applicants work experience. 
        Please parse it into the relevant data schema. 
        If the answer is detailed, please do not modify it. 
        If the answer is not detailed enough in certain fields, 
        please modify it and elaborate with more detail. 
        If the answer is missing, please state that it is not specified. 
        Please make the work experience relevant and detailed to the ${jobdescription}.`;

	const workexperience_content = param.resumeexperience;
	// `Co-Founder / Software Developer [Company: StackAI ]					      Jul 2024 - Present
	// Developed a full stack web application using JavaScript, TypeScript, React, and Next.js.
	// Built a robust Docx and Pdf creator with text editing capabilities using Docx library.
	// Integrated AI features to generate intelligent resumes and cover letters using Langchain and OpenAI API.
	// Created robust microservices backend, API’s and Database that uses Supabase Storage, Database, and Edge functions to manage the core features of the application.
	// Deploying on Vercel and Supabase to ensure architecture is scalability and high performance.
	// Collaborated with the technical team to align technical solutions with customer requirements.
	// Managed product development cycle, UX design process to reflect iterative deployment of features.

	// Front End Developer Co-op [Company: Viridis Research ]					  Aug 2023 - Dec 2023
	// Hired to develop a modern website using Gatsby, React, Javascript, HTML / CSS for a clean tech startup.
	// Used front end frameworks including CSS, Webpack, and UI Component libraries to manage UI design.
	// Integrated multiple third party services from Google API, Mailchimp, Contently to as website services.
	// New website has been used for the company's marketing and to raise venture capital investments.
	// Engaged in weekly leadership meetings with cross functional team to address business requirements and used agile tools (JIRA, Trello) for project management.
	// Conducted testing and debugging to ensure new changes would integrate well into existing project.

	// Technical Support Specialist / IT Technician [Company: Simon Fraser University ]		   Sept 2021 - Present
	// Developed a web app with React and Node.js that consolidated multiple streams of video data into a dashboard for internal use by 20+ AV staff.
	// Provided technical support to 500+ service request tickets addressing issues related to end user devices, MFA, networking troubleshooting, hardware, customer support.
	// Helped install, update, and troubleshoot Linux, Windows and Mac workstations.`

	const TechnicalSkills = z.object({
		technicalskills_programminglanguages: z.string(),
		technicalskills_concepts: z.string().optional(),
		technicalskills_applications: z.string().optional(),
		technicalskills_frameworks: z.string().optional(),
	});

	const Education = z.object({
		education_degree: z.string(),
		education_degree_details: z.string().optional(),
		education_date: z.string(),
		education_courses_taken: z.string().optional(),
		education_school: z.string(),
		education_location: z.string(),
	});

	const ProjectDetails = z.object({
		project_bullets: z.string(),
	});

	const Project = z.object({
		project_description: z.string(),
		project_details: z.array(ProjectDetails),
		project_date: z.string().optional(),
		project_title: z.string(),
		project_course: z.string().optional(),
	});

	const ProjectsArray = z.object({
		projects: z.array(Project),
		project_description: z.string(),
	});

	const WorkExperienceDetails = z.object({
		workexperience_bullets: z.string(),
	});

	const WorkExperience = z.object({
		workexperience_description: z.string(),
		workexperience_details: z.array(WorkExperienceDetails),
		workexperience_date: z.string(),
		workexperience_jobtitle: z.string(),
		workexperience_company: z.string(),
	});

	const WorkExperienceArray = z.object({
		work_experience: z.array(WorkExperience),
	});

	try {
		// const technicalskills_response = technicalskills_AI(technicalskills_prompt, technicalskills_content)
		// console.log("This is the technicalskills_response in test.js", technicalskills_response);
		const technicalskills_completion = await openai.beta.chat.completions.parse(
			{
				model: 'gpt-4o-mini',
				messages: [
					{ role: 'system', content: `${technicalskills_prompt}` },
					{ role: 'user', content: `${technicalskills_content}` },
				],
				response_format: zodResponseFormat(TechnicalSkills, 'technical_skills'),
			}
		);

		const technicalskillsDetails =
			technicalskills_completion.choices[0].message.parsed;
		// console.log("This is the technicalskillsDetails in test.js", technicalskillsDetails);

		// const education_response = education_AI(education_prompt, education_content);
		// console.log("This is the education_response in test.js", education_response);
		const education_completion = await openai.beta.chat.completions.parse({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: `${education_prompt}` },
				{ role: 'user', content: `${education_content}` },
			],
			response_format: zodResponseFormat(Education, 'education'),
		});

		const educationDetails = education_completion.choices[0].message.parsed;
		// console.log("This is the educationDetails in test.js", educationDetails);

		// // const project_response = project_AI(project_prompt, project_content);
		// // console.log("This is the project_response in test.js", project_response);
		const project_completion = await openai.beta.chat.completions.parse({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: `${project_prompt}` },
				{ role: 'user', content: `${project_content}` },
			],
			response_format: zodResponseFormat(ProjectsArray, 'projects'),
		});

		const projectDetails = project_completion.choices[0].message.parsed;
		// console.log("This is the projectDetails in test.js", projectDetails);

		const work_experience_completion = await openai.beta.chat.completions.parse(
			{
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: `${workexperience_prompt}`,
					},
					{ role: 'user', content: `${workexperience_content}` },
				],
				response_format: zodResponseFormat(
					WorkExperienceArray,
					'work_experience'
				),
			}
		);

		const workExperienceDetails =
			work_experience_completion.choices[0].message.parsed;
		// console.log("This is the workExperienceDetails in test.js", workExperienceDetails);

		console.log('bottom of the executeAI function');

		return {
			technicalskillsDetails,
			educationDetails,
			projectDetails,
			workExperienceDetails,
		};
	} catch (error) {
		console.error('Error while invoking execute AI function', error);
	}
};
