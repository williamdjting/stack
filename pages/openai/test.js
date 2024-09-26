import { useEffect } from "react";

import { z } from "zod";

import { llm } from "@/app/lib/openai/openai"

const AIpage = ({}) => {

  const joke = z.object({
    setup: z.string().describe("The setup of the joke"),
    punchline: z.string().describe("The punchline to the joke"),
    rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
  });
  
  const structuredLlm = llm.withStructuredOutput(joke);


  useEffect(() => {
    // Add your side effects here

    const fetchData = async () => {
      try {
        const returnVal = await structuredLlm.invoke("Tell me a joke about cats");
        console.log("This is the returnVal in test.js", returnVal);
      } catch (error) {
        console.error("Error while invoking structuredLlm", error);
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
