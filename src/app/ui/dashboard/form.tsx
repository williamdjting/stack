"use client";
// Import React and CSS module
import React, { createContext, useState, useEffect, useContext } from "react";
import styles from "./ui-dashboard.module.css";
import axios from "axios"; // Import Axios
import {
  TestSubmitDataDashboardPost,
  TestSubmitDataDashboardGet,
} from "../../lib/api-calls";
import { TestSubmitDataDashboardSideNavGet } from "@/app/lib/api-call-sidenav";
import Papa from "papaparse";
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/readCSV");
      const result = await response.json();
      console.log("line 73", result);
      setData(result);
      // if (result.length > 0) {
      //   setHeaders(Object.keys(result[0]));
      // }
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
      <div className={styles.topbarContainer0}>
        <div className={styles.topbar0}>
          <div className={styles.mapbox}>
            <h1 className="font-size:36px">
              <b>Job Applications</b>
            </h1>
            <table>
              <thead className={styles.thead}>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Job Link</th>
                  <th>Resume</th>
                  <th>Cover Letter</th>
                  <th>Go to Application</th>
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
                    <td className={styles.tcol}>{row.description}</td>
                    <td className={styles.tcol}>
                      <a href={row.github}>{row.github}</a>
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
        </div>
      </div>

      {/* <div className={styles.topbarContainer}>
        <div className={styles.topbar1}>
          <div className={styles.mapbox}>
            <div>
              <p>Top Collection: {csvData.projectname}</p>
              <p>Top Distribution: {csvData.url}</p>
              <p>Top Quality: {csvData.description}</p>
              <p>Top Split: {csvData.github}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className={styles.topbarContainer}>
        <div className={styles.topbar1}>
          <div className={styles.mapbox}>
            <div>
              <p>Collection: {csvData.projectname}</p>
              <p>Distribution: {csvData.url}</p>
              <p>Quality: {csvData.description}</p>
              <p>Split: {csvData.github}</p>
            </div>
          </div>
        </div> */}

      {/* <div className={styles.topbar2}>
          <div className={styles.mapbox}>
            <div>
              <p>Collection: {csvData.projectname}</p>
              <p>Distribution: {csvData.url}</p>
              <p>Quality: {csvData.description}</p>
              <p>Split: {csvData.github}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
 
          <div className={styles.form2}>
            <input
              className={styles.form3}
              type="number"
              name="projectid"
              value={formData.projectid}
              onChange={handleChange}
              placeholder="projectid"
            />
            <textarea
              className={styles.form3}
              name="collection"
              value={formData.collection}
              onChange={handleChange}
              placeholder="Collection"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="distribution"
              value={formData.distribution}
              onChange={handleChange}
              placeholder="Distribution"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              placeholder="Quality"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="split"
              value={formData.split}
              onChange={handleChange}
              placeholder="Split"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="bias"
              value={formData.bias}
              onChange={handleChange}
              placeholder="Bias"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="influence"
              value={formData.influence}
              onChange={handleChange}
              placeholder="Influence"
              rows={3}
              cols={25}
            />
            <textarea
              className={styles.form3}
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              placeholder="Outcome"
              rows={3}
              cols={25}
            /> */}

      {/* <button onClick={downloadCSV} type="submit">Submit</button>
            <button type="submit">Submit</button> */}
      {/* </div>

        </form> */}

      {/* <div className={styles.map}>
          <div className={styles.mapbox}>
            {submittedData.map((dataItem, index) => (
              <div className={styles.mapbox2} key={index}>
                <p>ProjectID: {dataItem.projectid}</p>
                <p>Collection: {dataItem.collection}</p>
                <p>Distribution: {dataItem.distribution}</p>
                <p>Quality: {dataItem.quality}</p>
                <p>Split: {dataItem.split}</p>
                <p>Bias: {dataItem.bias}</p>
                <p>Influence: {dataItem.influence}</p>
                <p>Outcome: {dataItem.outcome}</p>
              </div>
            ))}
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
}
