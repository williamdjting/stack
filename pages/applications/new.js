"use client";
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from "next/router";
import { supabase } from "@/app/lib/supabase/server";
import React, { useState } from "react";

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

    // Insert new data to Supabase using insertNewData, not submittedData
    const response = await supabase
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
      })
      .select(); // Returns the inserted data

    if (response.error) {
      console.error("Insert error:", response.error);

    } else {
      console.log("Insert successful:", response.data);

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



// "use client";

// import { useRouter } from "next/router";

// import { supabase } from "@/app/lib/supabase/server";

// import React, { createContext, useState, useEffect, useContext } from "react";

// //This is the new application page that will insert into the Supabase Notes1 DB

// export default function NewApplication() {
//   const [insertNewData, setinsertNewData] = useState({
//     JobTitle: "",
//     Company: "",
//     JobDescription: "",
//     ResumeExperience: "",
//     ResumeProjects: "",
//     ResumeSkills: "",
//     ResumeEducation: "",
//     CoverLetterContactInfo: "",
//     CoverLetterStyleRequest: "",
//   });

//   const [submittedData, setSubmittedData] = useState([
//     {
//       JobTitle: "",
//       Company: "",
//       JobDescription: "",
//       ResumeExperience: "",
//       ResumeProjects: "",
//       ResumeSkills: "",
//       ResumeEducation: "",
//       CoverLetterContactInfo: "",
//       CoverLetterStyleRequest: "",
//     },
//   ]);

//   // Handler to update form data
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setinsertNewData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a copy of the submittedData array
//     const newSubmittedData = [...submittedData];

//     // Push the formData object into the newSubmittedData array
//     newSubmittedData.push(insertNewData);

//     // Update the submittedData state with the new array
//     setSubmittedData(newSubmittedData);

//     const response = await supabase
//       .from("notes2")
//       .insert({
//         jobtitle: insertNewData.JobTitle, // Fixed: removed curly braces
//         company: insertNewData.Company,
//         jobdescription: insertNewData.JobDescription,
//         resumeexperience: insertNewData.ResumeExperience,
//         resumeskills: insertNewData.ResumeSkills,
//         resumeeducation: insertNewData.ResumeEducation,
//         coverlettercontactinfo: insertNewData.CoverLetterContactInfo, // Added missing part of the line
//         coverletterstylerequest: insertNewData.CoverLetterStyleRequest, // Fixed line continuation issue
//       })
//       .select(); // Returns the inserted data

//     if (response.error) {
//       console.error("Insert error:", response.error);
//     } else {
//       console.log("Insert successful:", response.data);
//     }
//   };

//   return (
//     <div>
//       <h1>New Application</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           Job Title:
//           <textarea
//             type="text"
//             name="JobTitle"
//             value={insertNewData.JobTitle}
//             onChange={handleChange}
//             placeholder="Enter Job Title"
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Company:
//           <textarea
//             name="Company"
//             value={insertNewData.Company}
//             placeholder="Enter Company"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Job Description:
//           <textarea
//             name="JobDescription"
//             value={insertNewData.JobDescription}
//             placeholder="Enter Job Description"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Resume - Experience:
//           <textarea
//             name="ResumeExperience"
//             value={insertNewData.ResumeExperience}
//             placeholder="Enter Resume Experience"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Resume - Projects:
//           <textarea
//             name="ResumeProjects"
//             value={insertNewData.ResumeProjects}
//             placeholder="Enter Resume Projects"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Resume - Skills:
//           <textarea
//             name="ResumeSkills"
//             value={insertNewData.ResumeSkills}
//             placeholder="Enter Resume Skills"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Resume - Education:
//           <textarea
//             name="ResumeEducation"
//             value={insertNewData.ResumeEducation}
//             placeholder="Enter Resume Education"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Cover Letter - Contact Info:
//           <textarea
//             name="CoverLetterContactInfo"
//             value={insertNewData.CoverLetterContactInfo}
//             placeholder="Enter Cover Letter Contact Info"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <div>
//           Cover Letter - Style Request:
//           <textarea
//             name="CoverLetterStyleRequest"
//             value={insertNewData.CoverLetterStyleRequest}
//             placeholder="Enter Cover Letter Style Request"
//             onChange={handleChange}
//             rows={5}
//             cols={25}
//             required
//           />
//         </div>
//         <br></br>
//         <br></br>

//         <input type="submit" value="Create Resume" />
//         <br></br>
//         <br></br>
//         <input type="submit" value="Create Cover Letter" />
//       </form>
//     </div>
//   );
// }
