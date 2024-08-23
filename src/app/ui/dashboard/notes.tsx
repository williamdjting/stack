// from here 
// youtube1: https://www.youtube.com/watch?v=Gz9bvYybaws&
// youtube2: https://www.youtube.com/watch?v=VjohMDwjty4
// using notes1 table

"use client";

// import { createClient } from '/src/app/lib/supabase/server';

// import supabase from "@/app/lib/supabase/server";

import React, { createContext, useState, useEffect, useContext } from "react";
//import styles from "./ui-dashboard.module.css";
import styles from "./dashboard.module.css";

import Link from "next/link";

import {createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export function Notes() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("notes1").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(smoothies);
        setFetchError(null);
      }
    };

    fetchData() 
  }, []);

  return (
    <>
      <div>
        {fetchError && (<p>{fetchError}</p>)}
        {smoothies && (
          <div>
            {smoothies.map(smoothie => (
              <p>{smoothie.jobtitle}</p>
            ))}
          </div>
        )}
      </div>

      <div>hello</div>

      {/* <div className={styles.jobcontainer}>
      <h1>Jobs you have applied for</h1>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Job Description</th>
            <th>Resume Experience</th>
            <th>Cover Letter</th>
            <th>Application</th>
          </tr>
        </thead>
        <tbody>
  
          {data.map((row, index) => (
          <tr className={index ? styles.tbody : ""} key={index}>
            <td className={styles.tcol}>{row.jobtitle}</td>
            <td className={styles.tcol}>{row.company}</td>
            <td className={styles.tcol}>{row.joblink}</td>
            <td className={styles.tcol}>{row.resume}</td>
            <td className={styles.tcol}>{row.coverletter}</td>
            <ul>
            <li key={index}>
              <Link href={`/applications/${row.applicationdetails}`}>
                Go to Application {row.projectid}
              </Link>
            </li>
            </ul>
          </tr>
        ))}
        </tbody>
      </table>
      </div> */}
    </>
  );
}

// export async function Notes() {
//   const [notes1, setNotes1] = useState([]);

//   // const supabase = createClient();
//   // const { data: notes1 } = await supabase.from("notes1").select();

//   useEffect(() => {
//     // const fetchData = async () => {
//     //   const { data } = await supabase.from("notes1").select();
//     //   setNotes1(data || []);
//     // };
//     const fetchNotes = async () => {
//       try {
//         const response = await fetch('/api/getNoteAPI');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setNotes1(data);
//         console.log("line 31")
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchNotes();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   // const getNotesFromDB = JSON.stringify(notes2,null,2);
//   // previous value
//   // console.log(getNotesFromDB)
//   // return <pre>{JSON.stringify(notes2, null, 2)}</pre>

//   return (
//     <>
// <div className={styles.jobcontainer}>
// <h1>Jobs you have applied for</h1>
// <table>
//   <thead>
//     <tr>
//       <th>Job Title</th>
//       <th>Company</th>
//       <th>Job Description</th>
//       <th>Resume Experience</th>
//       <th>Cover Letter</th>
//       <th>Application</th>
//     </tr>
//   </thead>
//   <tbody>

//     {notes1.map((row, index) => (
//     <tr className={index ? styles.tbody : ""} key={index}>
//       <td className={styles.tcol}>{row.jobtitle}</td>
//       <td className={styles.tcol}>{row.company}</td>
//       <td className={styles.tcol}>{row.joblink}</td>
//       <td className={styles.tcol}>{row.resume}</td>
//       <td className={styles.tcol}>{row.coverletter}</td>
//       <ul>
//       <li key={index}>
//         <Link href={`/applications/${row.applicationdetails}`}>
//           Go to Application {row.projectid}
//         </Link>
//       </li>
//       </ul>
//     </tr>
//   ))}
//   </tbody>
// </table>
// </div>
//     </>
//   )
// }
