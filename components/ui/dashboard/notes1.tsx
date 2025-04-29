// from here
// youtube1: https://www.youtube.com/watch?v=Gz9bvYybaws&
// youtube2: https://www.youtube.com/watch?v=VjohMDwjty4
// using notes1 table

// "use client";

// import { createClient } from "@/app/lib/supabase/server";

// import { supabase } from '@/app/lib/supabase/server';
import { createClient } from '../../../app/supabase/server';

// import supabase from "@/app/lib/supabase/server";

import React, { createContext, useState, useEffect, useContext } from 'react';
import styles from './dashboard.module.css';
// import styles from "./ui-dashboard.module.css";

import Link from 'next/link';

export default async function Notes1() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('notes1')
		.insert({
			jobtitle: 'Dev Ops Developer',
			company: 'Company D',
			joblink: 'http://companyD.com',
			resume: 'resume4.pdf',
			coverletter: 'coverletter3.pdf',
		})
		.select();

	if (error) {
		console.error('Insert error:', error);
	}

	if (data) {
		console.log(data);
	}

	return (
		<>
			{/* <div>
        This is a the notes1 component. Here we hold the data from countries
        table
      </div>
      <table>
    
      <tbody>
        {notes.map((note, index) => (
          <tr className={index ? styles.tbody : ""} key={index}>
            <td className={styles.tcol}>{note.name}</td>
          </tr>
        ))}
      </tbody>
    </table> */}
		</>
	);
}
