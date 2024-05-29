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
import { readCSV } from "../../lib/readCSV";

// Define the Form component
export function Form() {
  // State to manage form data

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

  const filepath = "submittedDataSideNav.csv";

  useEffect(() => {
    fetch("/api/submitDataSideNav") // Call the API route
      .then((response) => response.json())
      .then((data) => setCsvData(data))
      .catch((error) => console.error("Error fetching CSV data:", error));
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

    console.log("this is submitted data", submittedData);

    await TestSubmitDataDashboardGet();
    await TestSubmitDataDashboardPost(submittedData);
  };

  // JSX for the form
  return (
    <>

      <div className={styles.topbarContainer}>
      <div className={styles.topbar1}>
        <div className={styles.mapbox}>
          <div>
            <p>Collection: {csvData.projectname}</p>
            <p>Distribution: {csvData.url}</p>
            <p>Quality: {csvData.description}</p>
            <p>Split: {csvData.github}</p>
          </div>
        </div>
      </div>

      <div className={styles.topbar2}>
        <div className={styles.mapbox}>
          <div>
            <p>Collection: {csvData.projectname}</p>
            <p>Distribution: {csvData.url}</p>
            <p>Quality: {csvData.description}</p>
            <p>Split: {csvData.github}</p>
          </div>
        </div>
      </div>

      </div>


      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Input fields for each property */}
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
            />
            {/* Submit button */}
            {/* <button onClick={downloadCSV} type="submit">Submit</button> */}
            <button type="submit">Submit</button>
          </div>
          {/* {formData && (
        <div>
          <p>ProjectID: {formData.projectid}</p>
          <p>Collection: {formData.collection}</p>
          <p>Distribution: {formData.distribution}</p>
          <p>Quality: {formData.quality}</p>
          <p>Split: {formData.split}</p>
          <p>Bias: {formData.bias}</p>
          <p>Influence: {formData.influence}</p>
          <p>Outcome: {formData.outcome}</p>
        </div>
      )} */}
        </form>
        {/* <Testing submittedData={submittedData}/>     */}

        <div className={styles.map}>
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
        </div>
      </div>
    </>
  );
}
