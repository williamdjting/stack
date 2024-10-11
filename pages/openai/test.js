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

  const resume2 = z.object({
    // jobDescription: z.string(),
    projects: z.string(),
    output2: z.string(),
  });
  
  const structuredLlm2 = llm.withStructuredOutput(resume2);

  // const prompt2 = `Given the ${jobDescriptionVal} and $
    const prompt2 = `Given the ${resumeProjectsVal}, list out four bullet points ordered by number for each project as it relates to job description . Please ensure there are empirical measurements. Please ensure the technical stack is highlighted. `;



  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        // const returnVal1 = await structuredLlm1.invoke(`${prompt1}`);
        // console.log("This is the returnVal1 in test.js", returnVal1);

        // const returnVal2 = await structuredLlm2.invoke(`${prompt2}`);
        // console.log("This is the returnVal2 in test.js", returnVal2);

        const completion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-2024-08-06",
          messages: [
            { role: "system", content: "You are a technical recruiter. You will be given a paragraph with information about an applicants projects and should convert it into the given structure" },
            { role: "user", content: "1. Data Visualization Dashboard:\n   - Developed interactive dashboards using Tableau, resulting in a 30% increase in data accessibility for stakeholders.\n   - Implemented real-time data processing with Apache Kafka, improving data refresh rates by 50%.\n   - Utilized SQL for data extraction and transformation, reducing query execution time by 40%.\n   - Collaborated with cross-functional teams to gather requirements, leading to a 25% reduction in project delivery time.\n\n2. Sales Forecasting Model:\n   - Built predictive models using Python and Scikit-learn, achieving an accuracy rate of 85% in sales predictions.\n   - Integrated time series analysis with ARIMA, enhancing forecast reliability by 20%.\n   - Employed data visualization techniques with Matplotlib to present forecasting results, improving stakeholder understanding by 35%.\n   - Conducted A/B testing on different forecasting methods, resulting in a 15% increase in forecast precision." },
          ],
          response_format: zodResponseFormat(Projects, "project_details"),
        });
        
        const projectDetails = completion.choices[0].message.parsed;
        console.log("This is the projectDetails in test.js", projectDetails);

      } catch (error) {
        console.error("Error while invoking", error);
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
