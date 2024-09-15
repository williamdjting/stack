// pages/applications/[id].js

// source: https://chatgpt.com/c/7b3706ca-945c-43ab-863e-a8d355b62d6f

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase/server";

// // Mock data - need to rewrite to pull from supabase
// const items = [
//   { id: "1", name: "Item 1", description: "Description for Item 1" },
//   { id: "2", name: "Item 2", description: "Description for Item 2" },
//   { id: "3", name: "Item 3", description: "Description for Item 3" },
// ];

const ItemPage = ({  }) => {
  const router = useRouter();

  const { id } = router.query; // extract 'id' from the URL params

  console.log({ id }, "the params id");
  console.log(id, "the params id");

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data on component mount
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("notes2")
        .select() // Adjust this to your table and query
        .eq("id", id) // Filter where 'id' equals the passed id
        .single(); // Expect only a single row (returns an error if multiple)

      if (error) {
        console.error(error);
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

  return (
    <div>
      <h1>Users List {data.id}</h1>

      <ul>Job Title: {data.jobtitle}</ul>
      <ul>Company: {data.company}</ul>
      <ul>Job Description: {data.jobdescription}</ul>
      <ul>Resume - Experience: {data.resumexperience}</ul>

      <ul>Resume - Projects: {data.resumeprojects}</ul>

      <ul>Resume - Skills: {data.resumeskills}</ul>

      <ul>Resume - Education: {data.resumeeducation}</ul>

      <ul>Cover Letter - Contact Info: {data.coverlettercontactinfo}</ul>

      <ul>Cover Letter - Style Request: {data.coverletterstylerequest}</ul>
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

