
// from here 
// youtube1: https://www.youtube.com/watch?v=Gz9bvYybaws&
// youtube2: https://www.youtube.com/watch?v=VjohMDwjty4
// using notes1 table

// "use client";

// import { createClient } from '@/app/lib/supabase/server';
import { supabase } from '@/app/lib/supabase/server';

// import supabase from "@/app/lib/supabase/server";

import React, { createContext, useState, useEffect, useContext } from "react";
import styles from "./dashboard.module.css";
// import styles from "./ui-dashboard.module.css";

import Link from "next/link";

export default async function Notes() {
  // const supabase = createClient();
  const { data: notes } = await supabase.from("notes1").select();
  // const [data, setData] = useState([]);

  // return <pre>{JSON.stringify(notes, null, 2)}</pre>
  if (!notes) {
    return <p>No posts found.</p>
  }
  
  return (
    <>
  <div className={styles.jobcontainer}>
    <h1>Jobs you have applied for</h1>
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Job Link</th>
          <th>Resume</th>
          <th>Cover Letter</th>
          <th>Application</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note, index) => (
          <tr className={index ? styles.tbody : ""} key={index}>
            <td className={styles.tcol}>{note.jobtitle}</td>
            <td className={styles.tcol}>{note.company}</td>
            <td className={styles.tcol}>
              <a href={note.joblink}>{note.joblink}</a>
            </td>
            <td className={styles.tcol}>{note.resume}</td>
            <td className={styles.tcol}>{note.coverletter}</td>
            <td className={styles.tcol}>
              <Link href={`/applications/${note.id}`}>
                Go to Application {note.id}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</>

  );
}


