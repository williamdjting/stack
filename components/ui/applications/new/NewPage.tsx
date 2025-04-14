"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// import { supabase } from '../../../../lib/supabase/server';
//
import { createClient } from "../../../../app/supabase/client";
import React, { useState, useEffect } from "react";

import { executeAI } from "../../../../lib/openai/executeai";

const supabase = createClient();

export default function NewPage() {
  const [insertNewData, setInsertNewData] = useState({
    jobtitle: "",
    company: "",
    jobdescription: "",
    resumeexperience: "",
    resumeskills: "",
    resumeprojects: "",
    resumeeducation: "",
    coverlettercontactinfo: "",
    coverletterstylerequest: "",
  });

  const [error, setError] = useState(null);

  const [redirectTo, setRedirectTo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo, router]);

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsertNewData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler to submit form data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert new data to Supabase
    const { data, error } = await supabase
      .from("notes2")
      .insert({
        jobtitle: insertNewData.jobtitle,
        company: insertNewData.company,
        jobdescription: insertNewData.jobdescription,
        resumeexperience: insertNewData.resumeexperience,
        resumeskills: insertNewData.resumeskills,
        resumeprojects: insertNewData.resumeprojects,
        resumeeducation: insertNewData.resumeeducation,
        coverlettercontactinfo: insertNewData.coverlettercontactinfo,
        coverletterstylerequest: insertNewData.coverletterstylerequest,
      })
      .select();

    if (error) {
      console.error("Insert error:", error);
    }
    // else {
    //   console.log("Insert successful");
    //   setRedirectTo("/projects");
    // }

    if (data) {
      setInsertNewData(data);
    } else if (error) {
      console.error(error);
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
              console.error("Error uploading blob to Supabase:", error);
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
              console.error("Error uploading blob to Supabase:", error);
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
          Job Title:
          <textarea
            style={{ color: "black" }}
            name="jobtitle"
            value={insertNewData.jobtitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Company:
          <textarea
            style={{ color: "black" }}
            name="company"
            value={insertNewData.company}
            onChange={handleChange}
            placeholder="Enter Company"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Job Description:
          <textarea
            style={{ color: "black" }}
            name="jobdescription"
            value={insertNewData.jobdescription}
            onChange={handleChange}
            placeholder="Enter Job Description"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Resume - Experience:
          <textarea
            style={{ color: "black" }}
            name="resumeexperience"
            value={insertNewData.resumeexperience}
            onChange={handleChange}
            placeholder="Enter Resume Experience"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Resume - Projects:
          <textarea
            style={{ color: "black" }}
            name="resumeprojects"
            value={insertNewData.resumeprojects}
            onChange={handleChange}
            placeholder="Enter Resume Projects"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Resume - Skills:
          <textarea
            style={{ color: "black" }}
            name="resumeskills"
            value={insertNewData.resumeskills}
            onChange={handleChange}
            placeholder="Enter Resume Skills"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Resume - Education:
          <textarea
            style={{ color: "black" }}
            name="resumeeducation"
            value={insertNewData.resumeeducation}
            onChange={handleChange}
            placeholder="Enter Resume Education"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Cover Letter - Contact Info:
          <textarea
            style={{ color: "black" }}
            name="coverlettercontactinfo"
            value={insertNewData.coverlettercontactinfo}
            onChange={handleChange}
            placeholder="Enter Cover Letter Contact Info"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <div>
          Cover Letter - Style Request:
          <textarea
            style={{ color: "black" }}
            name="coverletterstylerequest"
            value={insertNewData.coverletterstylerequest}
            onChange={handleChange}
            placeholder="Enter Cover Letter Style Request"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <br />
        <input type="submit" value="Create Resume and Cover Letter" />
      </form>
    </div>
  );
}
