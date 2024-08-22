"use client";
// Import React and CSS module
import React, { createContext, useState, useEffect, useContext } from "react";
//import styles from "./ui-dashboard.module.css";
import styles from "./dashboard.module.css";
import axios from "axios"; // Import Axios
import {
  TestSubmitDataDashboardPost,
  TestSubmitDataDashboardGet,
} from "../../lib/api-calls";
import { TestSubmitDataDashboardSideNavGet } from "@/app/lib/api-call-sidenav";
// import Papa from "papaparse";
import { readCSV } from "../../lib/readCSV";

import Link from "next/link";



// Define the Form component
export function Form() {
  // State to manage form data

  const filePath = "submittedDataSideNav.csv";

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const [csvData, setCsvData] = useState([
    {
      projectid: "",
      projectname: "Projects",
      url: "",
      description: "",
      github: "",
    },
  ]);

  const [formData, setFormData] = useState({
    projectid: "",
    collection: "",
    distribution: "",
    quality: "",
    split: "",
    bias: "",
    influence: "",
    outcome: "",
  });

  const [submittedData, setSubmittedData] = useState([
    {
      projectid: "",
      collection: "",
      distribution: "",
      quality: "",
      split: "",
      bias: "",
      influence: "",
      outcome: "",
    },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/readCSV");
  //     const result = await response.json();
  //     console.log("line 73", result);
  //     setData(result);
  //     // if (result.length > 0) {
  //     //   setHeaders(Object.keys(result[0]));
  //     // }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Create dummy data
      const dummyData = [
        {
          projectid: "1",
          projectname: "Project Alpha",
          url: "https://example.com/alpha",
          description: "A sample project",
          github: "https://github.com/user/alpha"
        },
        {
          projectid: "2",
          projectname: "Project Beta",
          url: "https://example.com/beta",
          description: "Another sample project",
          github: "https://github.com/user/beta"
        },
        {
          projectid: "3",
          projectname: "Project Gamma",
          url: "https://example.com/gamma",
          description: "Yet another sample project",
          github: "https://github.com/user/gamma"
        }
      ];
  
      // Simulate setting data fetched from an API
      setData(dummyData);
    };
  
    fetchData();
  }, []);
  

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("this is line 27", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setSubmittedData((prevSubmittedData) => ({
    //   ...prevSubmittedData,
    //   ...formData
    // }));

    // Create a copy of the submittedData array
    const newSubmittedData = [...submittedData];

    // Push the formData object into the newSubmittedData array
    newSubmittedData.push(formData);

    // Update the submittedData state with the new array
    setSubmittedData(newSubmittedData);

    console.log("this is formdata", formData);

    console.log("this is csvdata", csvData);

    console.log("this is submitted data", submittedData);

    await TestSubmitDataDashboardGet();
    await TestSubmitDataDashboardPost(submittedData);
  };

  // JSX for the form
  // commented out form elements are not being used, only the topbarContainer0 div block is used as the display list for the CSV
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
          {data.map((row, index) => (
          <tr className={index ? styles.tbody : ""} key={index}>
            <td className={styles.tcol}>{row.projectid}</td>
            <td className={styles.tcol}>{row.projectname}</td>
            <td className={styles.tcol}>
              <a href={row.url}>{row.url}</a>
            </td>
            <td className={styles.tcol}>hello</td>
            <td className={styles.tcol}>
              test
            </td>
            <li key={index}>
              <Link href={`/applications/${row.projectid}`}>
                Go to Application {row.projectid}
              </Link>
            </li>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    
    </>
  );
}
