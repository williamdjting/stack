import { useEffect } from "react";

import { z } from "zod";

import { llm } from "@/app/lib/openai/openai"



const AIpage = ({}) => {


  const jobDescriptionVal = 'Develop and maintain web applications';

  const resumeExperienceVal = '3 years at WebSolutions, developed client-side features';

  const resumeProjectsVal = 'Data visualization dashboard, Sales forecasting model';

  const resume1 = z.object({
    jobDescription: z.string(),
    responsibilities: z.string(),
    output: z.string(),
  });
  
  const structuredLlm1 = llm.withStructuredOutput(resume1);

  const prompt1 = `Given the ${jobDescriptionVal} and ${resumeExperienceVal} list out four bullet points ordered by number that describe the experiences as it relates to the job description. Please ensure there are empirical measurements.`;


  const resume2 = z.object({
    jobDescription: z.string(),
    projects: z.string(),
    output: z.string(),
  });
  
  const structuredLlm2 = llm.withStructuredOutput(resume1);

  const prompt2 = `Given the ${jobDescriptionVal} and ${resumeProjectsVal} create four bullet points for each project from ${resumeProjectsVal}. Please ensure there are empirical measurements.`;



  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        const returnVal1 = await structuredLlm1.invoke(`${prompt1}`);
        console.log("This is the returnVal1 in test.js", returnVal1);

        const returnVal2 = await structuredLlm2.invoke(`${prompt2}`);
        console.log("This is the returnVal2 in test.js", returnVal2);
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
