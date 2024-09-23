// pages/applications/[id].js

// source: https://chatgpt.com/c/7b3706ca-945c-43ab-863e-a8d355b62d6f

import { useRouter } from "next/router";

// import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase/server";

// // Mock data - need to rewrite to pull from supabase
// const items = [
//   { id: "1", name: "Item 1", description: "Description for Item 1" },
//   { id: "2", name: "Item 2", description: "Description for Item 2" },
//   { id: "3", name: "Item 3", description: "Description for Item 3" },
// ];

const ItemPage = ({}) => {
  const router = useRouter();

  const { id } = router.query; // extract 'id' from the URL params

  console.log({ id }, "the params id");
  console.log(id, "the params id");

  const [data, setData] = useState({
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
        setData(data);

      }
    };

    fetchData();

    setData({
      jobtitle: data.JobTitle,
      company: data.Company,
      jobdescription: data.JobDescription,
      resumeexperience: data.ResumeExperience,
      resumeskills: data.ResumeSkills,
      resumeprojects: data.ResumeProjects,
      resumeeducation: data.ResumeEducation,
      coverlettercontactinfo: data.CoverLetterContactInfo,
      coverletterstylerequest: data.CoverLetterStyleRequest,
    });

    console.log("line 47", id);
  }, [id]);

  if (!data) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }


  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
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
        jobtitle: data.JobTitle,
        company: data.Company,
        jobdescription: data.JobDescription,
        resumeexperience: data.ResumeExperience,
        resumeskills: data.ResumeSkills,
        resumeprojects: data.ResumeProjects,
        resumeeducation: data.ResumeEducation,
        coverlettercontactinfo: data.CoverLetterContactInfo,
        coverletterstylerequest: data.CoverLetterStyleRequest,
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error("Insert error:", error);
    } else {
      console.log("Insert successful - printing data", data);
      // setRedirectTo("/projects");
    }
  };

  return (
    <div>
      <h1>Application Page {data.id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Job Title:
          <textarea
            name="JobTitle"
            defaultValue={data.jobtitle}
            placeholder={data.jobtitle}
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
            defaultValue={data.company}
            placeholder={data.company}
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
            defaultValue={data.jobdescription}
            placeholder={data.jobdescription}
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
            defaultValue={data.resumeexperience}
            placeholder={data.resumeexperience}
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
            defaultValue={data.resumeprojects}
            placeholder={data.resumeprojects}
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
            defaultValue={data.resumeskills}
            placeholder={data.resumeskills}
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
            defaultValue={data.resumeeducation}
            placeholder={data.resumeeducation}
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
            defaultValue={data.coverlettercontactinfo}
            placeholder={data.coverlettercontactinfo}
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
            defaultValue={data.coverletterstylerequest}
            placeholder={data.coverletterstylerequest}
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
