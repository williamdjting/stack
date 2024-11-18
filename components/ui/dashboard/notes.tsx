"use client"

import React, { useState, useEffect } from "react";
// import { supabase } from '../../../lib/supabase/server'; // Make sure this path is correct
import { createClient } from '../../../app/supabase/client';
import styles from "../../../styles/dashboard.module.css"; // Ensure this path is correct
import Link from "next/link";

const supabase = createClient();

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]); // Use a specific type if you have one for notes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("notes2").select();
        if (error) throw error;
        setNotes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (notes.length === 0) return <p>No posts found.</p>;

  return (
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
            <tr className={index % 2 ? styles.tbody : ""} key={note.id}>
              <td className={styles.tcol}>{note.jobtitle}</td>
              <td className={styles.tcol}>{note.company}</td>
              <td className={styles.tcol}>
                <a href={note.joblink} target="_blank" rel="noopener noreferrer">{note.joblink}</a>
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
  );
}


// // from here 
// // youtube1: https://www.youtube.com/watch?v=Gz9bvYybaws&
// // youtube2: https://www.youtube.com/watch?v=VjohMDwjty4
// // using notes1 table

// // "use client";

// // import { createClient } from '@/app/lib/supabase/server';
// import { supabase } from '@/app/lib/supabase/server';

// // import supabase from "@/app/lib/supabase/server";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import styles from "./dashboard.module.css";
// // import styles from "./ui-dashboard.module.css";

// import Link from "next/link";


// export default async function Notes() {

//   useEffect(() => {

//     // const supabase = createClient();
//   const { data: notes } = await supabase.from("notes2").select();
//   // const [data, setData] = useState([]);

//   // return <pre>{JSON.stringify(notes, null, 2)}</pre>
//   if (!notes) {
//     return <p>No posts found.</p>
//   }


//   if (!id) {
//     console.log("this ID does not exist");
//     return;
//   }

//   const fetchData = async () => {
//     const { data, error } = await supabase
//       .from("notes2")
//       .select() // Adjust this to your table and query


//   };

//   fetchData();



//   }, []);
  
  
//   return (
//     <>
//   <div className={styles.jobcontainer}>
//     <h1>Jobs you have applied for</h1>
//     <table>
//       <thead>
//         <tr>
//           <th>Job Title</th>
//           <th>Company</th>
//           <th>Job Link</th>
//           <th>Resume</th>
//           <th>Cover Letter</th>
//           <th>Application</th>
//         </tr>
//       </thead>
//       <tbody>
//         {notes.map((note, index) => (
//           <tr className={index ? styles.tbody : ""} key={index}>
//             <td className={styles.tcol}>{note.jobtitle}</td>
//             <td className={styles.tcol}>{note.company}</td>
//             <td className={styles.tcol}>
//               <a href={note.joblink}>{note.joblink}</a>
//             </td>
//             <td className={styles.tcol}>{note.resume}</td>
//             <td className={styles.tcol}>{note.coverletter}</td>
//             <td className={styles.tcol}>
//               <Link href={`/applications/${note.id}`}>
//                 Go to Application {note.id}
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </>

//   );
// }


