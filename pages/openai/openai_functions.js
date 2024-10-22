
// i tried to put the functions here in this file but the 
// parallel promises got stuck so executing in the same file may be the way

import { zodResponseFormat } from "openai/helpers/zod";

import { z } from "zod";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "", 
  dangerouslyAllowBrowser: true // Pass API key for authentication
});



export async function technicalskills_AI(prompt1, content1) {

    const TechnicalSkills = z.object({
        technicalskills_programminglanguages: z.string(),
        technicalskills_concepts: z.string().optional(),
        technicalskills_applications: z.string().optional(),
        technicalskills_frameworks: z.string().optional(),
      })


    const technicalskills_completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: `${prompt}` },
          { role: "user", content: `${content}` },
        ],
        response_format: zodResponseFormat(TechnicalSkills, "technical_skills"),
      });
      
      const technicalskillsDetails = technicalskills_completion.choices[0].message.parsed;
    //   console.log("This is the technicalskillsDetails in test.js", technicalskillsDetails);

      return technicalskillsDetails;
}


export async function education_AI(prompt2, content2) {

    const Education = z.object({
        education_degree: z.string(),
        education_degree_details: z.string().optional(),
        education_date: z.string(),
        education_courses_taken: z.string().optional(),
        education_school: z.string(),
        education_location: z.string(),
      })
    
    const education_completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: `
            ${prompt}` },
          { role: "user", content: `${content}` },
        ],
        response_format: zodResponseFormat(Education, "education"),
      });


      const educationDetails = education_completion.choices[0].message.parsed;
    //   console.log("This is the educationDetails in test.js", educationDetails);

      return educationDetails;

}



export async function project_AI(prompt3, content3) {
    try {
      const ProjectBullets = z.object({
        project_bullets: z.string(),
      });
    
      const ProjectDetails = z.object({
        project_description: z.string(),
        project_details: z.array(ProjectBullets),
        project_date: z.string().optional(),
        project_title: z.string(),
        project_course: z.string().optional(),
      });
    
      const Projects = z.object({
        projects: z.array(ProjectDetails),
        project_description: z.string(),
      });
  
      const project_completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: `${prompt}` },
          { role: "user", content: `${content}` },
        ],
        response_format: zodResponseFormat(Projects, "projects"),
      });
  
      const projectDetails = project_completion.choices[0].message.parsed;
      return projectDetails;
    
    } catch (error) {
      console.error("Error in project_AI:", error);
      throw error; // Re-throw to handle it elsewhere
    }
  }
  

// A function to call them one after the other
export async function executeAllSequentially(prompt1, content1, prompt2, content2, prompt3, content3) {
    try {
        // Execute technical skills AI function
        const technicalSkillsResult = await technicalskills_AI(prompt1, content1);
        console.log("Technical Skills:", technicalSkillsResult);

        // Execute education AI function
        const educationResult = await education_AI(prompt2, content2);
        console.log("Education:", educationResult);

        // Execute project AI function
        const projectResult = await project_AI(prompt3, content3);
        console.log("Projects:", projectResult);

        return { technicalSkillsResult, educationResult, projectResult };

    } catch (error) {
        console.error("Error in executeAllSequentially:", error);
        throw error;
    }
}