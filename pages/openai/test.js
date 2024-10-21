import { useEffect } from "react";

import { z } from "zod";

import { llm } from "@/app/lib/openai/openai"


import { zodResponseFormat } from "openai/helpers/zod";


import OpenAI from "openai";

// import  openai2  from "@/app/lib/openai/openai2"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", 
  dangerouslyAllowBrowser: true // Pass API key for authentication
});
// need to protect the API key using https://chatgpt.com/share/67075d4f-24a8-8008-9637-32900bb98ef1


const AIpage = ({}) => {


  const jobDescriptionVal = 'Develop and maintain web applications';

  const resumeExperienceVal = '3 years at WebSolutions, developed client-side features';

  const resumeProjectsVal = 'Data visualization dashboard, Sales forecasting model';

  const resume1 = z.object({
    jobDescription: z.string(),
    responsibilities: z.string(),
    output1: z.string(),
  });
  
  const structuredLlm1 = llm.withStructuredOutput(resume1);

  const prompt1 = `Given the ${jobDescriptionVal} and ${resumeExperienceVal} list out four bullet points ordered by number that describe the experiences as it relates to the job description. Please ensure there are empirical measurements. Please ensure the technical stack is highlighted.`;

  const ProjectBullets = z.object({
    project_bullets: z.string(),
  });

  const ProjectDetails = z.object({
    project_description: z.string(),
    project_details: z.array(ProjectBullets),
  });

  const Projects = z.object({
    projects: z.array(ProjectDetails),
    // summary_of_projects: z.string(),
    project_description: z.string(),
  });

  const WorkExperienceBullets = z.object({
    workexperience_bullets: z.string(),
  });

  const WorkExperienceDetails = z.object({
    workexperience_description: z.string(),
    workexperience_details: z.array(WorkExperienceBullets),
    workexperience_date: z.string(),
    workexperience_jobtitle: z.string(),
    workexperience_company: z.string(),
  });

  const WorkExperience = z.object({
    work_experience: z.array(WorkExperienceDetails),
    // summary_of_projects: z.string(),
    // project_description: z.string(),
  });


  // const resume2 = z.object({
  //   // jobDescription: z.string(),
  //   projects: z.string(),
  //   output2: z.string(),
  // });
  
  // const structuredLlm2 = llm.withStructuredOutput(resume2);

  // // const prompt2 = `Given the ${jobDescriptionVal} and $
  //   const prompt2 = `Given the ${resumeProjectsVal}, list out four bullet points ordered by number for each project as it relates to job description . Please ensure there are empirical measurements. Please ensure the technical stack is highlighted. `;



  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        // const returnVal1 = await structuredLlm1.invoke(`${prompt1}`);
        // console.log("This is the returnVal1 in test.js", returnVal1);

        // const returnVal2 = await structuredLlm2.invoke(`${prompt2}`);
        // console.log("This is the returnVal2 in test.js", returnVal2);

        const project_completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-2024-08-06",
          messages: [
            { role: "system", content: "You are a technical recruiter. You will be given a paragraph with information about an applicants projects and should convert it into the given structure" },
            { role: "user", content: "1. Data Visualization Dashboard:\n   - Developed interactive dashboards using Tableau, resulting in a 30% increase in data accessibility for stakeholders.\n   - Implemented real-time data processing with Apache Kafka, improving data refresh rates by 50%.\n   - Utilized SQL for data extraction and transformation, reducing query execution time by 40%.\n   - Collaborated with cross-functional teams to gather requirements, leading to a 25% reduction in project delivery time.\n\n2. Sales Forecasting Model:\n   - Built predictive models using Python and Scikit-learn, achieving an accuracy rate of 85% in sales predictions.\n   - Integrated time series analysis with ARIMA, enhancing forecast reliability by 20%.\n   - Employed data visualization techniques with Matplotlib to present forecasting results, improving stakeholder understanding by 35%.\n   - Conducted A/B testing on different forecasting methods, resulting in a 15% increase in forecast precision." },
          ],
          response_format: zodResponseFormat(Projects, "project_details"),
        });
        
        const projectDetails = project_completion.choices[0].message.parsed;
        console.log("This is the projectDetails in test.js", projectDetails);

        // try {
        const work_experience_completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-2024-08-06",
          messages: [
            { role: "system", content: "You are a technical recruiter. You will be given multiple paragraphs with information about an applicants work experience. Please parse it into the relevant data schema. If the answer is detailed, please do not modify it. If the answer is not detailed enough in certain fields, please modify it and elaborate with more detail." },
            { role: "user", content: `
Co-Founder / Software Developer [Company: StackAI ]					      Jul 2024 - Present
Developed a full stack web application using JavaScript, TypeScript, React, and Next.js.
Built a robust Docx and Pdf creator with text editing capabilities using Docx library.
Integrated AI features to generate intelligent resumes and cover letters using Langchain and OpenAI API.
Created robust microservices backend, API’s and Database that uses Supabase Storage, Database, and Edge functions to manage the core features of the application.
Deploying on Vercel and Supabase to ensure architecture is scalability and high performance.
Collaborated with the technical team to align technical solutions with customer requirements.
Managed product development cycle, UX design process to reflect iterative deployment of features.

Front End Developer Co-op [Company: Viridis Research ]					  Aug 2023 - Dec 2023
Hired to develop a modern website using Gatsby, React, Javascript, HTML / CSS for a clean tech startup.
Used front end frameworks including CSS, Webpack, and UI Component libraries to manage UI design.
Integrated multiple third party services from Google API, Mailchimp, Contently to as website services.
New website has been used for the company's marketing and to raise venture capital investments.
Engaged in weekly leadership meetings with cross functional team to address business requirements and used agile tools (JIRA, Trello) for project management.
Conducted testing and debugging to ensure new changes would integrate well into existing project.

Technical Support Specialist / IT Technician [Company: Simon Fraser University ]		   Sept 2021 - Present
Developed a web app with React and Node.js that consolidated multiple streams of video data into a dashboard for internal use by 20+ AV staff.
Provided technical support to 500+ service request tickets addressing issues related to end user devices, MFA, networking troubleshooting, hardware, customer support.
Helped install, update, and troubleshoot Linux, Windows and Mac workstations.
` },
          ],
          response_format: zodResponseFormat(WorkExperience, "work_experience"),
        });
        
        const workExperienceDetails = work_experience_completion.choices[0].message.parsed;
        console.log("This is the workExperienceDetails in test.js", workExperienceDetails);
      // }

      // catch (error) {
      //   console.error("Error while invoking work experience", error);
      // }

      } catch (error) {
        console.error("Error while invoking project experience", error);
      }
    };

    fetchData(); // Call the async function

  }, []);

  return (
    <>
      <div>Test.js</div>
    </>
  );
};

export default AIpage;
