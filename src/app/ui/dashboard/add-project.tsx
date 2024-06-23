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
    icon: DocumentDuplicateIcon,
  },
  { name: "Project Discussion", href: "/projects", icon: UserGroupIcon },
];

export function AddProject() {
  const pathname = usePathname();

  const [projectData, setProjectData] = useState({
    projectid: '',
    projectname: '',
    url: '',
    description: '',
    icon: DocumentDuplicateIcon,
    github: '',
  });

  const [submittedData, setSubmittedData] = useState([
    {
      projectid: '',
      projectname: 'Projects',
      url: '',
      description: '',
      icon: DocumentDuplicateIcon,
      github: '',
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
          <input
            className={styles.projectform3}
            type="number"
            name="projectid"
            value={projectData.projectid}
            onChange={handleChange}
            placeholder="projectid"
          />
          <input
            className={styles.projectform3}
            name="projectname"
            value={projectData.projectname}
            onChange={handleChange}
            placeholder="projectname"
            rows={1}
            cols={25}
          />
          <textarea
            className={styles.projectform3}
            name="url"
            value={projectData.url}
            onChange={handleChange}
            placeholder="url"
            rows={1}
            cols={25}
          />
          <textarea
            className={styles.projectform3}
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="description"
            rows={1}
            cols={25}
          />
          <textarea
            className={styles.projectform3}
            name="github"
            value={projectData.github}
            onChange={handleChange}
            placeholder="github"
            rows={1}
            cols={25}
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}  */}

      {/* {datasheetData.map((data) => {
        const LinkIcon = data.icon;
        return (
          <Link
            key={data.id}
            href={`/projects/${data.id}`} // Add the missing href property
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === data.href,
              },
            )}
          >
            
            
            <li className={styles.projectbox}>
            <LinkIcon className="w-6" />
            {data.name}</li>
          </Link>
        );
      })} */}

      <div className={styles.projectListContainer}>


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
      </div>

    </>
  );
}
