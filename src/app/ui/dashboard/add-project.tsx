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
    Job_Title: "",
    Company: "",
    Job_Link: "",
    Resume: "",
    Cover_Letter: "",
  });

  const [submittedData, setSubmittedData] = useState([
    {
      Job_Title: "",
      Company: "",
      Job_Link: "",
      Resume: "",
      Cover_Letter: "",
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
          <p>Add a Job Application</p>
        </div>
        <div className={styles.projectform2}>
          <input
            className={styles.projectform3}
            name="Job_Title"
            value={projectData.Job_Title}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
          <input
            className={styles.projectform3}
            name="Company"
            value={projectData.Company}
            onChange={handleChange}
            placeholder="Company"
            rows={1}
            cols={25}
            required
          />

          <input
            type="text"
            className={styles.projectform3}
            name="Job_Link"
            value={projectData.Job_Link}
            onChange={handleChange}
            placeholder="Job Link"
            required
          />

          <input
            type="file"
            className={styles.projectform3}
            name="Resume"
            value={projectData.Resume}
            onChange={handleChange}
            placeholder="Resume"
            required
          />
          <input
            type="file"
            className={styles.projectform3}
            name="Cover_Letter"
            value={projectData.Cover_Letter}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* <div className={styles.projectListContainer}>

      {submittedData.map((data) => {
        const LinkIcon = data.icon;
        return (
          <Link
            key={data.projectid}
            href={`/projects/${data.projectid}`} // Add the missing href property
            // className={clsx(
            //   "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            //   {
            //     "bg-sky-100 text-blue-600": pathname === data.href,
            //   }
            // )}
          >
            <li className={styles.projectbox}>
              <LinkIcon className="w-6" />
              {data.projectname}
            </li>
          </Link>
        );
      })}
      </div> */}
    </>
  );
}
