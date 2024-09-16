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

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  const [redirectTo, setRedirectTo] = useState(null);
  const router2 = useRouter();

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo, router2]);

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

    console.log("line 47", id);
  }, [id]);

  if (!data) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  // on Submit need to update the Supabase database with the updated entered value and then execute the Submit button action (either create resume or create cover letter)

  return (
    <div>
      <h1>Application Page {data.id}</h1>
      <form>
        <div>
          Job Title:
          <textarea
            name="JobTitle"
            defaultValue={data.jobtitle}
            placeholder={data.jobtitle}
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
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Job Description:
          <textarea
            name="Job_Description:"
            defaultValue={data.jobdescription}
            placeholder={data.jobdescription}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Resume - Experience:
          <textarea
            name="resumexperience:"
            defaultValue={data.resumeexperience}
            placeholder={data.resumeexperience}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Resume - Projects:
          <textarea
            name="resumeprojects:"
            defaultValue={data.resumeprojects}
            placeholder={data.resumeprojects}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Resume - Skills:
          <textarea
            name="resumeskills:"
            defaultValue={data.resumeskills}
            placeholder={data.resumeskills}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Resume - Education:
          <textarea
            name="resumeeducation:"
            defaultValue={data.resumeeducation}
            placeholder={data.resumeeducation}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Cover Letter - Contact Info:
          <textarea
            name="coverlettercontactinfo:"
            defaultValue={data.coverlettercontactinfo}
            placeholder={data.coverlettercontactinfo}
            rows={5} cols={25}
            required
          />
        </div>
        <br></br>
        <div>
          Cover Letter - Style Request:
          <textarea
            name="coverletterstylerequest:"
            defaultValue={data.coverletterstylerequest}
            placeholder={data.coverletterstylerequest}
            rows={5} cols={25}
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
