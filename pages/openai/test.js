import { useEffect } from "react";

import { z } from "zod";

import { llm } from "@/app/lib/openai/openai"



const AIpage = ({}) => {


  const jobDescriptionVal = 'Develop and maintain web applications';

  const resumeExperienceVal = '3 years at WebSolutions, developed client-side features';

  const resumeIntoLLM = z.object({
    job: z.string(),
    responsibilities: z.string(),
  });
  
  const structuredLlm = llm.withStructuredOutput(resumeIntoLLM);

  const prompt = `Given the ${jobDescriptionVal}, list out four responsibilites of related to the job, given past experience: ${resumeExperienceVal}`;



  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        const returnVal = await structuredLlm.invoke(`${prompt}`);
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
