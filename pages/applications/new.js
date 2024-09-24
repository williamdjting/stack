"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/server";
import React, { useState, useEffect } from "react";



export default function NewApplication() {
  const [insertNewData, setInsertNewData] = useState({
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
    const { error } = await supabase
      .from("notes2")
      .insert({
        jobtitle: insertNewData.JobTitle,
        company: insertNewData.Company,
        jobdescription: insertNewData.JobDescription,
        resumeexperience: insertNewData.ResumeExperience,
        resumeskills: insertNewData.ResumeSkills,
        resumeprojects: insertNewData.ResumeProjects,
        resumeeducation: insertNewData.ResumeEducation,
        coverlettercontactinfo: insertNewData.CoverLetterContactInfo,
        coverletterstylerequest: insertNewData.CoverLetterStyleRequest,
      });

    if (error) {
      console.error("Insert error:", error);
    } else {
      console.log("Insert successful");
      setRedirectTo("/projects");
    }
  };

  return (
    <div>
      <h1>New Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Job Title:
          <textarea
            name="JobTitle"
            value={insertNewData.JobTitle}
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
            name="Company"
            value={insertNewData.Company}
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
            name="JobDescription"
            value={insertNewData.JobDescription}
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
            name="ResumeExperience"
            value={insertNewData.ResumeExperience}
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
            name="ResumeProjects"
            value={insertNewData.ResumeProjects}
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
            name="ResumeSkills"
            value={insertNewData.ResumeSkills}
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
            name="ResumeEducation"
            value={insertNewData.ResumeEducation}
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
            name="CoverLetterContactInfo"
            value={insertNewData.CoverLetterContactInfo}
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
            name="CoverLetterStyleRequest"
            value={insertNewData.CoverLetterStyleRequest}
            onChange={handleChange}
            placeholder="Enter Cover Letter Style Request"
            rows={5}
            cols={25}
            required
          />
        </div>
        <br />
        <br />
        <input type="submit" value="Create Resume" />
        <br />
        <br />
        <input type="submit" value="Create Cover Letter" />
      </form>
    </div>
  );
}

