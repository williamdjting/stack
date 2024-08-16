"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./ui-dashboard.module.css";
import datasheetData from "../../lib/datasheet-data";

import {
  TestSubmitDataDashboardSideNavGet,
  TestSubmitDataDashboardSideNavPost,
} from "../../lib/api-call-sidenav";

const links = [
  {
    name: "Project Findings",
    href: "/projects",
    // icon: DocumentDuplicateIcon,
  },
  { name: "Project Discussion", href: "/projects" },
];

export function AddProject() {
  const pathname = usePathname();

  const [projectData, setProjectData] = useState({
    JobTitle: "",
    Company: "",
    JobDescription: "",
    ResumeExperience: "",
    ResumeProjects: "",
    ResumeSkills: "",
    ResumeEducation: "",
    CoverLetterContactInfo: "",
    CoverLetterStyleRequest: "",
  });

  const [submittedData, setSubmittedData] = useState([
    {
      JobTitle: "",
      Company: "",
      JobDescription: "",
      ResumeExperience: "",
      ResumeProjects: "",
      ResumeSkills: "",
      ResumeEducation: "",
      CoverLetterContactInfo: "",
      CoverLetterStyleRequest: "",
    },
  ]);

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("this is line 27", projectData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of the submittedData array
    const newSubmittedData = [...submittedData];

    // Push the formData object into the newSubmittedData array
    newSubmittedData.push(projectData);

    // Update the submittedData state with the new array
    setSubmittedData(newSubmittedData);

    console.log("this is projectData", projectData);

    console.log("this is submitted data", submittedData);

    await TestSubmitDataDashboardSideNavGet();
    await TestSubmitDataDashboardSideNavPost(submittedData);
  };

  return (
    <>
      <form className={styles.projectform} onSubmit={handleSubmit}>
        {/* Input fields for each property */}
        <div className={styles.projectform2}>
          <p><b>Add a Job Application</b></p>
        </div>
        <div className={styles.projectform2}>
          <input
            className={styles.projectform3}
            name="JobTitle"
            value={projectData.JobTitle}
            onChange={handleChange}
            placeholder="1. Job Title"
            required
          />
          <input
            className={styles.projectform3}
            name="Company"
            value={projectData.Company}
            onChange={handleChange}
            placeholder="2. Company"
            rows={1}
            cols={25}
            required
          />

          <input
            type="text"
            className={styles.projectform3}
            name="JobDescription"
            value={projectData.JobLink}
            onChange={handleChange}
            placeholder="3. Job Description"
            required
          />

          <input
            type="text"
            className={styles.projectform3}
            name="ResumeExperience"
            value={projectData.Resume}
            onChange={handleChange}
            placeholder="4. Resume - Experience"
            required
          />
          <input
            type="text"
            className={styles.projectform3}
            name="ResumeProjects"
            value={projectData.Resume}
            onChange={handleChange}
            placeholder="5. Resume - Projects"
            required
          />
          <input
            type="text"
            className={styles.projectform3}
            name="ResumeSkills"
            value={projectData.Resume}
            onChange={handleChange}
            placeholder="6. Resume - Skills"
            required
          />
          <input
            type="text"
            className={styles.projectform3}
            name="ResumeEducation"
            value={projectData.Resume}
            onChange={handleChange}
            placeholder="7. Resume - Education"
            required
          />
          <input
            type="text"
            className={styles.projectform3}
            name="CoverLetterContactInfo"
            value={projectData.Cover_Letter}
            onChange={handleChange}
            placeholder="8. Cover Letter - Contact Info"
            required
          />
          <input
            type="text"
            className={styles.projectform3}
            name="CoverLetterStyleRequest"
            value={projectData.Cover_Letter}
            onChange={handleChange}
            placeholder="9. Cover Letter - Style Request"
            required
          />
          <div className={styles.submitButtonContainer}>
          <button className={styles.submitButton}type="submit"><b>Submit</b></button>
          </div>
        </div>
      </form>

      
    </>
  );
}
