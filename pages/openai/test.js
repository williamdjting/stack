import { useEffect } from "react";

import { z } from "zod";

import { llm } from "@/app/lib/openai/openai"

import { completion } from "zod-gpt";

const AIpage = ({}) => {

  const joke = z.object({
    job: z.string().describe("Develop and maintain web applications"),
    responsibilities: z.string().describe("List out four responsibilites of the job"),
    rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
  });
  
  const structuredLlm = llm.withStructuredOutput(joke);

  // const jobDescriptionVal = 'Develop and maintain web applications';

  // const resumeExperienceVal = '3 years at WebSolutions, developed client-side features';

  // const resume = z.object({
  //   jobDescription: z.string(),
  //   resumeExperience: z.string(),
  // });

  // const prompt = `Create four bullet points that take the ${resumeExperienceVal} and match it with the ${jobDescriptionVal}`



  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        const returnVal = await structuredLlm.invoke("Given the job, list out four responsibilites of the job");
        console.log("This is the returnVal in test.js", returnVal);
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
