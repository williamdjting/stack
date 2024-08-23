`use server`

import { createClient } from './server';

export async function insertNote(jobtitle: string, company: string, jobdescription: string, resumexperience: string, resumeprojects: string, resumeskills: string, resumeeducation: string, coverlettercontactinfo: string, coverletterstylerequest: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notes2")
    .insert([
      { jobtitle, company, jobdescription, resumexperience, resumeprojects, resumeskills, resumeeducation, coverlettercontactinfo, coverletterstylerequest }
    ]);

  if (error) {
    console.error("Error inserting data:", error);
    return { error };
  }

  return { data };
}


