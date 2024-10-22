// pages/applications/[id].js

// source: https://chatgpt.com/c/7b3706ca-945c-43ab-863e-a8d355b62d6f

import { useRouter } from "next/router";

// import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase/server";

import { executeAI }  from '../openai/executeai'

const ItemPage = ({}) => {
  const router = useRouter();

  const { id } = router.query; // extract 'id' from the URL params

  console.log({ id }, "the params id");
  // console.log(id, "the params id");

  const [newData, setNewData] = useState({
    jobtitle: "",
    company: "",
    jobdescription: "",
    resumeexperience: "",
    resumeskills: "",
    resumeprojects: "",
    resumeeducation: "",
    coverlettercontactinfo: "",
    coverletterstylerequest: "",
  });

  const [error, setError] = useState(null);

  const [redirectTo, setRedirectTo] = useState(null);
  const router2 = useRouter();

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo, router2]);

  // need to add a handleSubmit to update the DB with the new updated data and then redirect back home

  useEffect(() => {
    // Fetch data at specific ID on component mount
    if (!id) {
      console.log("this ID does not exist");
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("notes2")
        .select() // Adjust this to your table and query
        .eq("id", id) // Filter where 'id' equals the passed id
        .single(); // Expect only a single row (returns an error if multiple)

      if (error) {
        console.error(error);
        console.log("line 44");
        setError(error.message); // Set error if there's an issue
      } else {
        setNewData(data);

      }
    };

    fetchData();

    // setNewData({
    //   jobtitle: newData.JobTitle,
    //   company: newData.Company,
    //   jobdescription: newData.JobDescription,
    //   resumeexperience: newData.ResumeExperience,
    //   resumeskills: newData.ResumeSkills,
    //   resumeprojects: newData.ResumeProjects,
    //   resumeeducation: newData.ResumeEducation,
    //   coverlettercontactinfo: newData.CoverLetterContactInfo,
    //   coverletterstylerequest: newData.CoverLetterStyleRequest,
    // });

    console.log("line 92", id);
  }, [id]);

  

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  // on Submit need to update the Supabase database with the updated entered value and then execute the Submit button action (either create resume or create cover letter)
  // Handler to submit form data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert new data to Supabase
    const { data, error } = await supabase
      .from("notes2")
      .update({
        jobtitle: newData.JobTitle,
        company: newData.Company,
        jobdescription: newData.JobDescription,
        resumeexperience: newData.ResumeExperience,
        resumeskills: newData.ResumeSkills,
        resumeprojects: newData.ResumeProjects,
        resumeeducation: newData.ResumeEducation,
        coverlettercontactinfo: newData.CoverLetterContactInfo,
        coverletterstylerequest: newData.CoverLetterStyleRequest,
      })
      .eq('id', id)
      .select()


// this redirect should occur but i think after the executeAI function is called?
    // if (error) {
    //   console.error("Insert error:", error);
    // } else {
    //   console.log("Insert successful - printing data", data);
    //   setRedirectTo("/projects");
    // }
    console.log("line 135 outside executeAI")
    

// this component calls executeAI which calls openAI API
    try {
      console.log("line 140 inside executeAI");
      const aiResponse = await executeAI(); // should add a parameter to pass in as a props object to the AI
      console.log("AI Response:", aiResponse);
    } catch (error) {
      console.error("Error calling executeAI:", error);
    }
  };

  return (
    <div>
      <h1>Application Page {newData.id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Job Title:
          <textarea
            name="JobTitle"
            defaultValue={newData.jobtitle}
            placeholder={newData.jobtitle}
            onChange={handleChange}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Company:
          <textarea
            name="Company"
            defaultValue={newData.company}
            placeholder={newData.company}
            onChange={handleChange}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Job Description:
          <textarea
            name="JobDescription"
            defaultValue={newData.jobdescription}
            placeholder={newData.jobdescription}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <div>
          Resume - Experience:
          <textarea
            name="ResumeExperience"
            defaultValue={newData.resumeexperience}
            placeholder={newData.resumeexperience}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <div>
          Resume - Projects:
          <textarea
            name="ResumeProjects"
            defaultValue={newData.resumeprojects}
            placeholder={newData.resumeprojects}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <div>
          Resume - Skills:
          <textarea
            name="ResumeSkills"
            defaultValue={newData.resumeskills}
            placeholder={newData.resumeskills}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <div>
          Resume - Education:
          <textarea
            name="ResumeEducation"
            defaultValue={newData.resumeeducation}
            placeholder={newData.resumeeducation}
            onChange={handleChange}

            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Cover Letter - Contact Info:
          <textarea
            name="CoverLetterContactInfo"
            defaultValue={newData.coverlettercontactinfo}
            placeholder={newData.coverlettercontactinfo}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <div>
          Cover Letter - Style Request:
          <textarea
            name="CoverLetterStyleRequest"
            defaultValue={newData.coverletterstylerequest}
            placeholder={newData.coverletterstylerequest}
            rows={5} cols={25}
            onChange={handleChange}

            required
          />
        </div>
        <br></br>
        <br></br>

        <input type="submit" value="Create Resume" />
        <br></br>
        <br></br>
        <input type="submit" value="Create Cover Letter" />
      </form>
    </div>
  );
};

// getStaticPaths and getStaticProps from
// https://chatgpt.com/c/66e63bd1-ce70-8008-927d-c1caf88c1c0c

export async function getStaticPaths() {
  // Fetch available IDs from Supabase if needed
  const { data: items } = await supabase.from("notes2").select("id");

  const paths = items.map((item) => ({
    params: { id: item.id.toString() }, // Generate paths dynamically
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch the item from Supabase for the given 'id'
  const { data: item, error } = await supabase
    .from("notes2")
    .select()
    .eq("id", params.id)
    .single();

  return {
    props: { item },
    // revalidate: 10, // Optional: Revalidate data every 10 seconds
  };
}

export default ItemPage;
