
// 1

// "use client"

import { createClient } from '/src/app/lib/supabase/server';

import React, { createContext, useState, useEffect, useContext } from "react";
//import styles from "./ui-dashboard.module.css";
import styles from "./dashboard.module.css";

import Link from "next/link";

export async function Notes() {

  // const [notes1, setNotes1] = useState([]);

  const supabase = createClient();
  const { data: notes1 } = await supabase.from("notes1").select();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await supabase.from("notes1").select();
  //     setNotes1(data || []);
  //   };

  //   fetchData();
  // }, []); // Empty dependency array means this effect runs once when the component mounts




  // const getNotesFromDB = JSON.stringify(notes2,null,2);
  // previous value
  // console.log(getNotesFromDB)
  // return <pre>{JSON.stringify(notes2, null, 2)}</pre>


  return (
    <>
      <div className={styles.jobcontainer}>
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
  
          {notes1.map((row, index) => (
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
      </div>
    </>
  )
}


