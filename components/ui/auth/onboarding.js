"use client";

// uses this chatgpt as inspiration https://chatgpt.com/share/675a02af-58d0-8008-9e32-44fe262a0f04

import React, { useState } from "react";

export function OnboardingFlow() {
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const [insertNewData, setInsertNewData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    linkedin: "",
    personalwebsite: "",
    github: "",
    location: "",
    personalsummary: "",
  });

  const [insertEducationData, setInsertEducationData] = useState({
    school: "",
    major: "",
    degreetype: "",
    GPA: "",
    startmonth: "",
    startyear: "",
    endmonth: "",
    endyear: "",
    other: "",
  });

  const [insertLeadershipVolunteerData, setinsertLeadershipVolunteerData] =
    useState({
      company: "",
      location: "",
      position: "",
      experiencetype: "",
      startmonth: "",
      startyear: "",
      endmonth: "",
      endyear: "",
      other: "",
    });

  const [insertProjectData, setinsertProjectData] = useState({
    company: "",
    location: "",
    startmonth: "",
    startyear: "",
    endmonth: "",
    endyear: "",
    other: "",
  });

  const [insertSkills1Form, setInsertSkills1Form] = useState({
    codinglanguages: "",
    programmingconcepts: "",
    tools: "",
    frameworks: "",
  });

  const [insertSkills2Form, setInsertSkills2Form] = useState({
    businesscommunications: "",
    leadership: "",
    projectmanagement: "",
    technical: "",
  });

  const [insertWorkData, setInsertWorkData] = useState({
    company: "",
    location: "",
    position: "",
    experiencetype: "",
    startmonth: "",
    startyear: "",
    endmonth: "",
    endyear: "",
    other: "",
  });

  // const [preferences, setPreferences] = useState([]);

  const steps = [
    <ContactInfoForm
      key="contactinfoform"
      insertNewData={insertNewData}
      setInsertNewData={setInsertNewData}
    />,
    <EducationForm
      key="educationform"
      insertEducationData={insertEducationData}
      setInsertEducationData={setInsertEducationData}
    />,
    <WorkExperienceForm
      key="workexperienceform"
      insertWorkData={insertWorkData}
      setInsertWorkData={setInsertWorkData}
    />,
    <LeadershipVolunteerExperienceForm
      key="leadershipvolunteerform"
      insertLeadershipVolunteerData={insertLeadershipVolunteerData}
      setinsertLeadershipVolunteerData={setinsertLeadershipVolunteerData}
    />,
    <ProjectsForm
      key="projectform"
      insertProjectData={insertProjectData}
      setinsertProjectData={setinsertProjectData}
    />,
    <SkillsForm
      key="skillform"
      insertSkills1Form={insertSkills1Form}
      setInsertSkills1Form={setInsertSkills1Form}
      insertSkills2Form={insertSkills2Form}
      setInsertSkills2Form={setInsertSkills2Form}
    />,
    // <PreferencesStep
    //   key="preferences"
    //   preferences={preferences}
    //   setPreferences={setPreferences}
    // />,
    <SummaryStep
      key="summary"
      insertNewData={insertNewData.firstname}
      insertEducationData={insertEducationData.school}
      insertWorkData={insertWorkData.company}
      insertLeadershipVolunteerData={insertLeadershipVolunteerData.company}
      insertProjectData={insertProjectData.company}
      insertSkills1Form={insertSkills1Form.codinglanguages}
      insertSkills2Form={insertSkills2Form.businesscommunications}
    />,
  ];

  return (
    <div>
      <div>{steps[step]}</div>
      <div>
        {step > 0 && <button onClick={prevStep}>Back</button>}
        {step < steps.length - 1 && <button onClick={nextStep}>Next</button>}
        {step === steps.length - 1 && (
          <button onClick={() => alert("Onboarding Complete!")}>Finish</button>
        )}
      </div>
    </div>
  );
}

const LeadershipVolunteerExperienceForm = ({
  insertLeadershipVolunteerData,
  setinsertLeadershipVolunteerData,
}) => {
  return (
    <div>
      <div>Add your leadership / volunteer experience</div>
      <br></br>
      <div>Leadership / Volunteer Experience 1</div>
      <form>
        <div>
          Company
          <input
            name="company"
            value={insertLeadershipVolunteerData.company}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your company"
            required
          />
        </div>
        <br />
        <div>
          Location
          <input
            name="location"
            value={insertLeadershipVolunteerData.location}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>
        <br />
        <div>
          Position Title
          <input
            name="position"
            value={insertLeadershipVolunteerData.position}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your position"
            required
          />
        </div>
        <br />
        <div>
          Experience Type
          <input
            name="experiencetype"
            value={insertLeadershipVolunteerData.experiencetype}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your experiencetype"
            required
          />
        </div>
        <br />
        <div>
          Start Month
          <input
            name="startmonth"
            value={insertLeadershipVolunteerData.startmonth}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your start month"
            required
          />
        </div>
        <br />
        <div>
          Start Year
          <input
            name="startyear"
            value={insertLeadershipVolunteerData.startyear}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your start year"
            required
          />
        </div>
        <br />
        <div>
          End Month
          <input
            name="endmonth"
            value={insertLeadershipVolunteerData.endmonth}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your end month"
            required
          />
        </div>
        <br />
        <div>
          End Year
          <input
            name="endyear"
            value={insertLeadershipVolunteerData.endyear}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter your end year"
            required
          />
        </div>
        <div>I currently work here</div>
        <br />
        <div>
          Description
          <br></br>
          <textarea
            name="other"
            value={insertLeadershipVolunteerData.other}
            onChange={(e) => setinsertLeadershipVolunteerData(e.target.value)}
            placeholder="Enter any other information"
            row={5}
            col={25}
            required
          />
        </div>
        <div>Add Leadership / Volunteer Experience</div>
        <br />
      </form>
    </div>
  );
};

const ContactInfoForm = ({ insertNewData, setInsertNewData }) => {
  return (
    <div>
      <div>Welcome to StackUp AI! </div>
      <br></br>
      <div>
        This will take 5 minutes. Please enter all the information. The more
        detail, the better the result! :)
      </div>
      <br></br>
      <form>
        <div>
          First Name
          <input
            name="firstname"
            value={insertNewData.firstname}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your firstname"
            required
          />
        </div>
        <br />
        <div>
          Last Name
          <input
            name="lastname"
            value={insertNewData.lastname}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your lastname"
            required
          />
        </div>
        <br />
        <div>
          Email
          <input
            name="email"
            value={insertNewData.email}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <br />
        <div>
          LinkedIn
          <input
            name="linkedIn"
            value={insertNewData.linkedIn}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your LinkedIn"
            required
          />
        </div>
        <br />
        <div>
          Personal Website
          <input
            name="personalwebsite"
            value={insertNewData.personalwebsite}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your personalwebsite"
            required
          />
        </div>
        <br />
        <div>
          Github
          <input
            name="github"
            value={insertNewData.github}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your github"
            required
          />
        </div>
        <br />
        <div>
          Location
          <input
            name="location"
            value={insertNewData.location}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>
        <br />
        <div>
          Personal Summary
          <input
            name="personalsummary"
            value={insertNewData.personalsummary}
            onChange={(e) => setInsertNewData(e.target.value)}
            placeholder="Enter your personal summary"
            required
          />
        </div>
        <br />
      </form>
    </div>
  );
};

const EducationForm = ({ insertEducationData, setInsertEducationData }) => {
  return (
    <div>
      <div>Add your education history </div>
      <br></br>
      <div>Education 1</div>
      <form>
        <div>
          School Name
          <input
            name="school"
            value={insertEducationData.school}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your school"
            required
          />
        </div>
        <br />
        <div>
          Major
          <input
            name="major"
            value={insertEducationData.major}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your major"
            required
          />
        </div>
        <br />
        <div>
          Degree Type
          <input
            name="degreetype"
            value={insertEducationData.degreetype}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your degree type"
            required
          />
        </div>
        <br />
        <div>
          GPA
          <input
            name="GPA"
            value={insertEducationData.GPA}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your GPA"
            required
          />
        </div>
        <br />
        <div>
          Start Month
          <input
            name="startmonth"
            value={insertEducationData.startmonth}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your start month"
            required
          />
        </div>
        <br />
        <div>
          Start Year
          <input
            name="startyear"
            value={insertEducationData.startyear}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your start year"
            required
          />
        </div>
        <br />
        <div>
          End Month
          <input
            name="endmonth"
            value={insertEducationData.endmonth}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your end month"
            required
          />
        </div>
        <br />
        <div>
          End Year
          <input
            name="endyear"
            value={insertEducationData.endyear}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter your end year"
            required
          />
        </div>
        <div>Clear Dates</div>
        <br />
        <div>
          Courses Taken / Concepts Learned / Scholarships / Other
          <input
            name="other"
            value={insertEducationData.other}
            onChange={(e) => setInsertEducationData(e.target.value)}
            placeholder="Enter any other information"
            required
          />
        </div>
        <div>Add Education</div>
        <br />
      </form>
    </div>
  );
};

const ProjectsForm = ({ insertProjectData, setinsertProjectData }) => {
  return (
    <div>
      <div>Add your projects</div>
      <br></br>
      <div>Project 1</div>
      <form>
        <div>
          Company
          <input
            name="company"
            value={insertProjectData.company}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your company"
            required
          />
        </div>
        <br />
        <div>
          Location
          <input
            name="location"
            value={insertProjectData.location}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>
        <br />
        <div>
          Start Month
          <input
            name="startmonth"
            value={insertProjectData.startmonth}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your start month"
            required
          />
        </div>
        <br />
        <div>
          Start Year
          <input
            name="startyear"
            value={insertProjectData.startyear}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your start year"
            required
          />
        </div>
        <br />
        <div>
          End Month
          <input
            name="endmonth"
            value={insertProjectData.endmonth}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your end month"
            required
          />
        </div>
        <br />
        <div>
          End Year
          <input
            name="endyear"
            value={insertProjectData.endyear}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter your end year"
            required
          />
        </div>
        <div>I am currently building this</div>
        <br />
        <div>
          Description
          <br></br>
          <textarea
            name="other"
            value={insertProjectData.other}
            onChange={(e) => setinsertProjectData(e.target.value)}
            placeholder="Enter any other information"
            row={5}
            col={25}
            required
          />
        </div>
        <div>Add a Project</div>
        <br />
      </form>
    </div>
  );
};

const SkillsForm = ({
  insertSkills1Form,
  setInsertSkills1Form,
  insertSkills2Form,
  setInsertSkills2Form,
}) => {
  const [selectedSkill, setSelectedSkill] = useState("");

  // Handler to update the state based on selection
  const handleSelection = (e) => {
    setSelectedSkill(e.target.value);
  };

  return (
    <div>
      <div>Finally, add your skills!</div>
      <br></br>

      {/* option selector for the skill choice, maybe this is not need*/}
      <div>
        <form>
          <label htmlFor="skills">Skill Options: </label>
          <select name="skills" id="skills" onChange={handleSelection}>
            <option value="technical">Technical Skills</option>
            <option value="business">Business Skills</option>
          </select>
        </form>
      </div>

      {/* Conditionally render the JSX based on selectedSkill */}

      {selectedSkill === "" && (
        <div>
          <br></br>

          <form>
            <div>
              Coding Languages
              <input
                name="codinglanguages"
                value={insertSkills1Form.codinglanguages}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your coding languages"
                required
              />
            </div>
            <br />
            <div>
              Programming Concepts
              <input
                name="programmingconcepts"
                value={insertSkills1Form.programmingconcepts}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your programming concepts"
                required
              />
            </div>
            <br />
            <div>
              Tools / Applications
              <input
                name="tools"
                value={insertSkills1Form.tools}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your tools / applications"
                required
              />
            </div>
            <br />
            <div>
              Frameworks
              <input
                name="frameworks"
                value={insertSkills1Form.frameworks}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your frameworks"
                required
              />
            </div>
            <br />
          </form>
        </div>
      )}

      {selectedSkill === "technical" && (
        <div>
          <br></br>

          <form>
            <div>
              Coding Languages
              <input
                name="codinglanguages"
                value={insertSkills1Form.codinglanguages}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your coding languages"
                required
              />
            </div>
            <br />
            <div>
              Programming Concepts
              <input
                name="programmingconcepts"
                value={insertSkills1Form.programmingconcepts}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your programming concepts"
                required
              />
            </div>
            <br />
            <div>
              Tools / Applications
              <input
                name="tools"
                value={insertSkills1Form.tools}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your tools / applications"
                required
              />
            </div>
            <br />
            <div>
              Frameworks
              <input
                name="frameworks"
                value={insertSkills1Form.frameworks}
                onChange={(e) => setInsertSkills1Form(e.target.value)}
                placeholder="Enter your frameworks"
                required
              />
            </div>
            <br />
          </form>
        </div>
      )}

      {selectedSkill === "business" && (
        <div>
          <br></br>

          <form>
            <div>
              Business Communications
              <input
                name="businesscommunications"
                value={insertSkills2Form.businesscommunications}
                onChange={(e) => setInsertSkills2Form(e.target.value)}
                placeholder="Enter your business communications"
                required
              />
            </div>
            <br />
            <div>
              Leadership / Case Competition
              <input
                name="leadership"
                value={insertSkills2Form.leadershipskills}
                onChange={(e) => setInsertSkills2Form(e.target.value)}
                placeholder="Enter your leadership / case competition skills"
                required
              />
            </div>
            <br />
            <div>
              Project Management
              <input
                name="projectmanagement"
                value={insertSkills2Form.projectmanagement}
                onChange={(e) => setInsertSkills2Form(e.target.value)}
                placeholder="Enter your project management"
                required
              />
            </div>
            <br />
            <div>
              Technical / Data Analysis Knowledge
              <input
                name="technical"
                value={insertSkills2Form.frameworks}
                onChange={(e) => setInsertSkills2Form(e.target.value)}
                placeholder="Enter your technical / data analysis knowledge"
                required
              />
            </div>
            <br />
          </form>
        </div>
      )}
    </div>
  );
};

const WorkExperienceForm = ({ insertWorkData, setInsertWorkData }) => {
  return (
    <div>
      <div>Add your work experience</div>
      <br></br>
      <div>Work Experience 1</div>
      <form>
        <div>
          Company
          <input
            name="company"
            value={insertWorkData.company}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your company"
            required
          />
        </div>
        <br />
        <div>
          Location
          <input
            name="location"
            value={insertWorkData.location}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>
        <br />
        <div>
          Position Title
          <input
            name="position"
            value={insertWorkData.position}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your position"
            required
          />
        </div>
        <br />
        <div>
          Experience Type
          <input
            name="experiencetype"
            value={insertWorkData.experiencetype}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your experiencetype"
            required
          />
        </div>
        <br />
        <div>
          Start Month
          <input
            name="startmonth"
            value={insertWorkData.startmonth}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your start month"
            required
          />
        </div>
        <br />
        <div>
          Start Year
          <input
            name="startyear"
            value={insertWorkData.startyear}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your start year"
            required
          />
        </div>
        <br />
        <div>
          End Month
          <input
            name="endmonth"
            value={insertWorkData.endmonth}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your end month"
            required
          />
        </div>
        <br />
        <div>
          End Year
          <input
            name="endyear"
            value={insertWorkData.endyear}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter your end year"
            required
          />
        </div>
        <div>I currently work here</div>
        <br />
        <div>
          Description
          <br></br>
          <textarea
            name="other"
            value={insertWorkData.other}
            onChange={(e) => setInsertWorkData(e.target.value)}
            placeholder="Enter any other information"
            row={5}
            col={25}
            required
          />
        </div>
        <div>Add Work Experience</div>
        <br />
      </form>
    </div>
  );
};

// boiler for UserType form

// const PreferencesStep = ({ preferences, setPreferences }) => {
//   const handlePreferenceChange = (preference) => {
//     const newPreferences = preferences.includes(preference)
//       ? preferences.filter((pref) => pref !== preference)
//       : [...preferences, preference];

//     setPreferences(newPreferences);
//   };

//   return (
//     <div>
//       <h2>Step 3: Choose Your Preferences</h2>
//       <label>
//         <input
//           type="checkbox"
//           checked={preferences.includes('Option 1')}
//           onChange={() => handlePreferenceChange('Option 1')}
//         />
//         Option 1
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={preferences.includes('Option 2')}
//           onChange={() => handlePreferenceChange('Option 2')}
//         />
//         Option 2
//       </label>
//     </div>
//   );
// };

const SummaryStep = ({
  insertNewData,
  insertEducationData,
  insertWorkData,
  insertLeadershipVolunteerData,
  insertProjectData,
  insertSkills1Form,
  insertSkills2Form
}) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Contact Info: {insertNewData.firstname}</p>
      <p>Education: {insertEducationData.school}</p>
      <p>Work Experience: {insertWorkData.company}</p>
      <p>Leadership / Volunteer Experience: {insertLeadershipVolunteerData.company}</p>
      <p>Projects: {insertProjectData.company}</p>
      <p>Skills: {insertSkills1Form.codinglanguages}</p>
      <p>Skills: {insertSkills2Form.businesscommunications}</p>
      
    </div>
  );
};

