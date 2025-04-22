"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// import { supabase } from '../../../../lib/supabase/server';
import { createClient } from "../../../../app/supabase/client";
import React, { useState, useEffect } from "react";

import { executeAI } from "../../../../lib/openai/executeai";

const supabase = createClient();

export default function NewPage() {
  const [insertNewData, setInsertNewData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    linkedin: "",
    personalwebsite: "",
    github: "",
    location: "",
    personalsummary: "",
    education: [
      {
        GPA: "",
        major: "",
        other: "",
        school: "",
        endyear: "",
        endmonth: "",
        startyear: "",
        degreetype: "",
        startmonth: "",
      },
    ],
    workexperience: [
      {
        other: "",
        company: "",
        endyear: "",
        endmonth: "",
        location: "",
        position: "",
        startyear: "",
        startmonth: "",
        experiencetype: "",
      },
    ],
    leadershipvolunteer: [
      {
        other: "",
        company: "",
        endyear: "",
        endmonth: "",
        location: "",
        position: "",
        startyear: "",
        startmonth: "",
        experiencetype: "",
      },
    ],
    projects: [
      {
        other: "",
        company: "",
        endyear: "",
        endmonth: "",
        location: "",
        startyear: "",
        startmonth: "",
      },
    ],
    technicalskills: {
      codinglanguages: "",
      programmingconcepts: "",
      tools: "",
      frameworks: "",
    },
    businessskills: {
      businesscommunications: "",
      leadership: "",
      projectmanagement: "",
      technical: "",
    },
  });

  // const [insertNewData, setInsertNewData] = useState({
  //   firstname: "",
  //   company: "",
  //   jobdescription: "",
  //   resumeexperience: "",
  //   resumeskills: "",
  //   resumeprojects: "",
  //   resumeeducation: "",
  //   coverlettercontactinfo: "",
  //   coverletterstylerequest: "",
  // });

  const [error, setError] = useState(null);

  const [redirectTo, setRedirectTo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }

    const fetchData = async () => {
      // // // Step 1: Get the current session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session?.user) {
        console.error(
          "Error fetching session or user:",
          sessionError?.message || "No active session"
        );
        setError(sessionError?.message || "User not authenticated");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase

      
        .from("profile_info")
        .select() // Adjust this to your table and query
        .eq("user_id", userId) // Filter where 'id' equals the passed id
        .single(); // Expect only a single row (returns an error if multiple)

      if (error) {
        console.log("line 132", error);
        console.log(error.message);
        console.log("line 46");
        setError(error.message); // Set error if there's an issue
      } else {
        setInsertNewData(data);
      }
    };

    fetchData();
  }, [redirectTo, router]);

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsertNewData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    const match = name.match(/^(education|workexperience|leadershipvolunteer|projects)\[(\d+)\]\.(.+)$/);
    if (!match) return;
  
    const section = match[1]; // "education", "workexperience", or "leadershipvolunteer" , or "projects"
    const index = parseInt(match[2], 10);
    const field = match[3];
  
    setInsertNewData((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value,
      };
  
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleChange3 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    const match = name.match(/^(technicalskills|businessskills)\.(.+)$/);
    if (!match) return;
  
    const section = match[1]; // "technicalskills" or "businessskills"
    const field = match[2];
  
    setInsertNewData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  

  // Handler to submit form data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert new data to Supabase
    const { data, error } = await supabase
      // .from("notes2")
      // .insert({
      //   jobtitle: insertNewData.jobtitle,
      //   company: insertNewData.company,
      //   jobdescription: insertNewData.jobdescription,
      //   resumeexperience: insertNewData.resumeexperience,
      //   resumeskills: insertNewData.resumeskills,
      //   resumeprojects: insertNewData.resumeprojects,
      //   resumeeducation: insertNewData.resumeeducation,
      //   coverlettercontactinfo: insertNewData.coverlettercontactinfo,
      //   coverletterstylerequest: insertNewData.coverletterstylerequest,
      // })
      // .select();

      .from("profile_info")
      .insert([
        {
          firstname: insertNewData.firstname,
          lastname: insertNewData.lastname,
          email: insertNewData.email,
          linkedin: insertNewData.linkedin,
          personalwebsite: insertNewData.personalwebsite,
          github: insertNewData.github,
          location: insertNewData.location,
          personalsummary: insertNewData.personalsummary,

          education: insertNewData.education, // jsonb array
          workexperience: insertNewData.workexperience, // jsonb array
          leadership: insertNewData.leadershipvolunteer, // jsonb array
          projects: insertNewData.projects, // jsonb array

          technicalskills: {
            codinglanguages: insertNewData.technicalskills.codinglanguages,
            programmingconcepts:
              insertNewData.technicalskills.programmingconcepts,
            tools: insertNewData.technicalskills.tools,
            frameworks: insertNewData.technicalskills.frameworks,
          },

          businessskills: {
            businesscommunications:
              insertNewData.businessskills.businesscommunications,
            leadership: insertNewData.businessskills.leadership,
            projectmanagement: insertNewData.businessskills.projectmanagement,
            technical: insertNewData.businessskills.technical,
          },
        },
      ])
      .select();

    if (error) {
      console.log("Insert error2:", error);
      console.log("Insert error3:", error.message);
    }
    // else {
    //   console.log("Insert successful");
    //   setRedirectTo("/projects");
    // }

    if (data) {
      setInsertNewData(data);
    } else if (error) {
      console.log("Insert error4:", error);
      console.log("Insert error5:", error.message);
      setError(error.message); // Set error if there's an issue
    }

    console.log("line 75 outside executeAI");

    // this component calls executeAI which calls openAI API
    try {
      console.log("line 140 inside executeAI");
      // use the updated data in notes2 held in useState as passed in param to executeAI
      const aiResponse = await executeAI(insertNewData); // pass in newData object to executeAI as param
      console.log("AI Response:", aiResponse);

      try {
        console.log("line 143 inside docx");

        console.log("Docx response");

        if (!aiResponse || Object.keys(aiResponse).length === 0) {
          throw new Error("Received empty or invalid data from OpenAI");
        } else {
          console.log("Starting to generate docx");

          const response = await fetch("/api/generate-resume-docx", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              aiResponse,
            }),
          });

          if (response.ok) {
            console.log("Resume response is okay");
            const blob = await response.blob();

            // upload the blob to Supabase Storage
            // reference: https://chatgpt.com/share/676e6af6-a3bc-8008-b027-83faad107989

            let filePathStorageID = 555;
            // there is no ID for a new application
            // so we have to find what the new ID value is for this uid or
            // we do random number / string generator???
            let filePath = `test/resume/Resume${filePathStorageID}`;
            const { data, error } = await supabase.storage
              .from("files") // Replace with your bucket name
              .upload(filePath, blob, {
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              });
            console.log("outside upload the blob execution");

            if (error) {
              console.log("Error uploading blob to Supabase:", error.message);
            } else {
              console.log("Blob uploaded successfully:", data);
            }

            // local download code
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            // need to change the download docx file name
            a.download = "Resume.docx";
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            console.error(
              "Failed to generate resume document",
              response.statusText
            );
          }

          const response2 = await fetch("/api/generate-cl-docx", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              aiResponse,
            }),
          });

          console.log("starting to generate cl");

          if (response2.ok) {
            console.log("Cover Letter response is okay");
            const blob = await response2.blob();

            // upload the blob to Supabase Storage
            // reference: https://chatgpt.com/share/676e6af6-a3bc-8008-b027-83faad107989

            let filePathStorageID2 = 555;
            // there is no ID for a new application
            // so we have to find what the new ID value is for this uid or
            // we do random number / string generator???
            let filePath2 = `test/coverletter/CoverLetter${filePathStorageID2}`;
            const { data, error } = await supabase.storage
              .from("files") // Replace with your bucket name
              .upload(filePath2, blob, {
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              });
            console.log("outside upload the blob execution");

            if (error) {

              console.log("Error uploading blob to Supabase:", error);
              console.log("Error uploading blob to Supabase:", error.message);
            } else {
              console.log("Blob uploaded successfully:", data);
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            // need to change the download docx file name
            a.download = "CoverLetter.docx";
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            console.error(
              "Failed to generate cl document",
              response2.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error calling docx file generator", error);
      }
    } catch (error) {
      console.error("Error calling supabase:", error);
    }
  };

  return (
    <div>
      <div>
        <Link href={`/dashboard`}>
          <h1>New Application</h1>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div style={{ fontWeight: "bold" }}>First Name:</div>

          <textarea
            style={{ color: "black" }}
            name="firstname"
            value={insertNewData.firstname}
            onChange={handleChange}
            placeholder="Enter Job Title"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Last Name:</div>
          <textarea
            style={{ color: "black" }}
            name="lastname"
            value={insertNewData.lastname}
            onChange={handleChange}
            placeholder="Enter Company"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Email:</div>
          <textarea
            style={{ color: "black" }}
            name="email"
            value={insertNewData.email}
            onChange={handleChange}
            placeholder="Enter Job Description"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>LinkedIn:</div>{" "}
          <textarea
            style={{ color: "black" }}
            name="linkedin"
            value={insertNewData.linkedin}
            onChange={handleChange}
            placeholder="Enter Resume Experience"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Personal Website:</div>{" "}
          <textarea
            style={{ color: "black" }}
            name="personalwebsite"
            value={insertNewData.personalwebsite}
            onChange={handleChange}
            placeholder="Enter Resume Projects"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Github:</div>
          <textarea
            style={{ color: "black" }}
            name="github"
            value={insertNewData.github}
            onChange={handleChange}
            placeholder="Enter Resume Skills"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Location:</div>
          <textarea
            style={{ color: "black" }}
            name="location"
            value={insertNewData.location}
            onChange={handleChange}
            placeholder="Enter Resume Education"
            rows={1}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          <div style={{ fontWeight: "bold" }}>Personal Summary:</div>
          <textarea
            style={{ color: "black" }}
            name="personalsummary"
            value={insertNewData.personalsummary}
            onChange={handleChange}
            placeholder="Enter Cover Letter Contact Info"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />

        <div
        // style={{
        //   border: "2px solid #ccc",
        //   padding: "1rem",
        //   borderRadius: "8px",
        //   backgroundColor: "#f9f9f9",
        //   marginBottom: "2rem",
        // }}
        >
          <div style={{ fontWeight: "bold" }}>Education:</div>

          {insertNewData.education.map((edu, index) => (
            <div
              key={index}
              style={
                {
                  // marginBottom: "1.5rem",
                  // padding: "1rem",
                  // backgroundColor: "#fff",
                  // border: "1px solid #ddd",
                  // borderRadius: "6px",
                }
              }
            >
              <div>
                School:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].school`}
                  value={edu.school}
                  onChange={handleChange2}
                  placeholder="Enter School Name"
                  rows={1}
                  cols={25}
                  required
                />
              </div>

              <div>
                Major:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].major`}
                  value={edu.major}
                  onChange={handleChange2}
                  placeholder="Enter Major"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                GPA:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].GPA`}
                  value={edu.GPA}
                  onChange={handleChange2}
                  placeholder="Enter GPA"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Degree Type:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].degreetype`}
                  value={edu.degreetype}
                  onChange={handleChange2}
                  placeholder="Enter Degree Type"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Month:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].startmonth`}
                  value={edu.startmonth}
                  onChange={handleChange2}
                  placeholder="Enter Start Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Year:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].startyear`}
                  value={edu.startyear}
                  onChange={handleChange2}
                  placeholder="Enter Start Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Month:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].endmonth`}
                  value={edu.endmonth}
                  onChange={handleChange2}
                  placeholder="Enter End Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Year:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].endyear`}
                  value={edu.endyear}
                  onChange={handleChange2}
                  placeholder="Enter End Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Other:
                <textarea
                  style={{ color: "black" }}
                  name={`education[${index}].other`}
                  value={edu.other}
                  onChange={handleChange2}
                  placeholder="Additional Info"
                  rows={1}
                  cols={25}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={
            {
              // border: "2px solid #ccc",
              // padding: "1rem",
              // borderRadius: "8px",
              // backgroundColor: "#f9f9f9",
              // marginBottom: "2rem"
            }
          }
        >
          <br></br>

          <div style={{ fontWeight: "bold" }}>Work Experience:</div>

          {insertNewData.workexperience.map((work, index) => (
            <div
              key={index}
              // style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px" }
              // }
            >
              <div>
                Company:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].company`}
                  value={work.company}
                  onChange={handleChange2}
                  placeholder="Enter Company Name"
                  rows={1}
                  cols={25}
                  required
                />
              </div>

              <div>
                Position:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].position`}
                  value={work.position}
                  onChange={handleChange2}
                  placeholder="Enter Position"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Location:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].location`}
                  value={work.location}
                  onChange={handleChange2}
                  placeholder="Enter Location"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Experience Type:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].experiencetype`}
                  value={work.experiencetype}
                  onChange={handleChange2}
                  placeholder="Full-time, Internship, etc."
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Month:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].startmonth`}
                  value={work.startmonth}
                  onChange={handleChange2}
                  placeholder="Enter Start Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Year:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].startyear`}
                  value={work.startyear}
                  onChange={handleChange2}
                  placeholder="Enter Start Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Month:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].endmonth`}
                  value={work.endmonth}
                  onChange={handleChange2}
                  placeholder="Enter End Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Year:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].endyear`}
                  value={work.endyear}
                  onChange={handleChange2}
                  placeholder="Enter End Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Other:
                <textarea
                  style={{ color: "black" }}
                  name={`workexperience[${index}].other`}
                  value={work.other}
                  onChange={handleChange2}
                  placeholder="Additional Info"
                  rows={1}
                  cols={25}
                />
              </div>
            </div>
          ))}
        </div>

        <br></br>

        <div
        //     style={{
        //   border: "2px solid #ccc",
        //   padding: "1rem",
        //   borderRadius: "8px",
        //   backgroundColor: "#f9f9f9",
        //   marginBottom: "2rem"
        // }}
        >
          <div style={{ fontWeight: "bold" }}>Leadership:</div>

          {insertNewData.leadershipvolunteer.map((lead, index) => (
            <div
              key={index}
              // style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px" }}
            >
              <div>
                Company:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].company`}
                  value={lead.company}
                  onChange={handleChange2}
                  placeholder="Enter Organization Name"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Position:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].position`}
                  value={lead.position}
                  onChange={handleChange2}
                  placeholder="Enter Role"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Location:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].location`}
                  value={lead.location}
                  onChange={handleChange2}
                  placeholder="Enter Location"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Experience Type:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].experiencetype`}
                  value={lead.experiencetype}
                  onChange={handleChange2}
                  placeholder="Club, Volunteer, etc."
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Month:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].startmonth`}
                  value={lead.startmonth}
                  onChange={handleChange2}
                  placeholder="Enter Start Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Year:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].startyear`}
                  value={lead.startyear}
                  onChange={handleChange2}
                  placeholder="Enter Start Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Month:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].endmonth`}
                  value={lead.endmonth}
                  onChange={handleChange2}
                  placeholder="Enter End Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Year:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].endyear`}
                  value={lead.endyear}
                  onChange={handleChange2}
                  placeholder="Enter End Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Other:
                <textarea
                  style={{ color: "black" }}
                  name={`leadershipvolunteer[${index}].other`}
                  value={lead.other}
                  onChange={handleChange2}
                  placeholder="Additional Info"
                  rows={1}
                  cols={25}
                />
              </div>
            </div>
          ))}
        </div>

        <br></br>

        <div
        // style={{
        //   border: "2px solid #ccc",
        //   padding: "1rem",
        //   borderRadius: "8px",
        //   backgroundColor: "#f9f9f9",
        //   marginBottom: "2rem"
        // }}
        >
          <div style={{ fontWeight: "bold" }}>Projects:</div>
          {insertNewData.projects.map((project, index) => (
            <div
              key={index}
              // style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px" }}
            >
              <div>
                Company / Org:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].company`}
                  value={project.company}
                  onChange={handleChange2}
                  placeholder="Personal or Collaborative Project?"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Location:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].location`}
                  value={project.location}
                  onChange={handleChange2}
                  placeholder="Online, Remote, etc."
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Month:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].startmonth`}
                  value={project.startmonth}
                  onChange={handleChange2}
                  placeholder="Enter Start Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Start Year:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].startyear`}
                  value={project.startyear}
                  onChange={handleChange2}
                  placeholder="Enter Start Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Month:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].endmonth`}
                  value={project.endmonth}
                  onChange={handleChange2}
                  placeholder="Enter End Month"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                End Year:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].endyear`}
                  value={project.endyear}
                  onChange={handleChange2}
                  placeholder="Enter End Year"
                  rows={1}
                  cols={25}
                />
              </div>

              <div>
                Other:
                <textarea
                  style={{ color: "black" }}
                  name={`projects[${index}].other`}
                  value={project.other}
                  onChange={handleChange2}
                  placeholder="Additional Info"
                  rows={1}
                  cols={25}
                />
              </div>
            </div>
          ))}
        </div>

        <br></br>

        <div
        // style={{
        //   border: "2px solid #ccc",
        //   padding: "1rem",
        //   borderRadius: "8px",
        //   backgroundColor: "#f9f9f9",
        //   marginBottom: "2rem",
        // }}
        >
          <div style={{ fontWeight: "bold" }}>Technical Skills:</div>

          <div>
            Coding Languages:
            <textarea
              style={{ color: "black" }}
              name="technicalskills.codinglanguages"
              value={insertNewData.technicalskills.codinglanguages}
              onChange={handleChange3}
              placeholder="Enter Programming Languages (e.g. Python, C++)"
              rows={3}
              cols={25}
              required
            />
          </div>

          <div>
            Programming Concepts:
            <textarea
              style={{ color: "black" }}
              name="technicalskills.programmingconcepts"
              value={insertNewData.technicalskills.programmingconcepts}
              onChange={handleChange3}
              placeholder="Enter Concepts (e.g. OOP, Data Structures)"
              rows={3}
              cols={25}
              required
            />
          </div>

          <div>
            Tools:
            <textarea
              style={{ color: "black" }}
              name="technicalskills.tools"
              value={insertNewData.technicalskills.tools}
              onChange={handleChange3}
              placeholder="Enter Tools (e.g. Git, Docker)"
              rows={3}
              cols={25}
              required
            />
          </div>

          <div>
            Frameworks:
            <textarea
              style={{ color: "black" }}
              name="technicalskills.frameworks"
              value={insertNewData.technicalskills.frameworks}
              onChange={handleChange3}
              placeholder="Enter Frameworks (e.g. React, Django)"
              rows={3}
              cols={25}
              required
            />
          </div>
        </div>

        <br></br>
{/* 
        <div style={{ fontWeight: "bold" }}>Business Skills:</div>

        <div>
          Business Communications:
          <textarea
            style={{ color: "black" }}
            name="businessskills.businesscommunications"
            value={insertNewData.businessskills.businesscommunications}
            onChange={handleChange3}
            placeholder="Enter Communication Skills (e.g. Presentations, Writing)"
            rows={3}
            cols={25}
            
          />
        </div>

        <div>
          Leadership:
          <textarea
            style={{ color: "black" }}
            name="businessskills.leadership"
            value={insertNewData.businessskills.leadership}
            onChange={handleChange3}
            placeholder="Enter Leadership Skills (e.g. Team Management)"
            rows={3}
            cols={25}
            
          />
        </div>

        <div>
          Project Management:
          <textarea
            style={{ color: "black" }}
            name="businessskills.projectmanagement"
            value={insertNewData.businessskills.projectmanagement}
            onChange={handleChange3}
            placeholder="Enter PM Skills (e.g. Agile, Scrum)"
            rows={3}
            cols={25}
            
          />
        </div>

        <div>
          Technical (Business Context):
          <textarea
            style={{ color: "black" }}
            name="businessskills.technical"
            value={insertNewData.businessskills.technical}
            onChange={handleChange3}
            placeholder="Enter Technical Skills in Business Context"
            rows={3}
            cols={25}
            
          />
        </div> */}

        <br />
        <br />
        <input type="submit" value="Create Resume and Cover Letter" />
      </form>
    </div>
  );
}
