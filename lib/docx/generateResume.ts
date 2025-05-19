import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  AlignmentType,
  TabStopType,
  TabStop,
  TabStopPosition,
} from "docx";

interface Project {
  project_description?: string;
  // add other relevant fields here
}

// interface Paragraph {
//   text: string;
//   // any other fields...
// }

export default async function generateResume(aiResponse: Record<string, any>) {
  console.log("Received request to generate resume DOCX");

  // const { aiResponse } = req.body;
  //   if (!aiResponse || !aiResponse.educationDetails || !aiResponse.projectDetails || !aiResponse.technicalskillsDetails || !aiResponse.workExperienceDetails || !aiResponse.coverLetterDetails) {
  //     return res.status(400).json({ error: 'Missing required details' });
  // }
  const {
    educationDetails,
    projectDetails,
    technicalskillsDetails,
    workExperienceDetails,
    coverLetterDetails,
  } = aiResponse;

  console.log("Creating resume document...");

  const doc = new Document({
    sections: [
      {
        headers: {
          first: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: coverLetterDetails.applicant_name,
                    bold: true,
                    size: 32,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${coverLetterDetails.applicant_email} | ${coverLetterDetails.applicant_phone}`,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                  before: 200,
                  after: 200,
                },
              }),
            ],
          }),
        },
        properties: {
          titlePage: true,
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Education",
                size: 24,
              }),
            ],
            spacing: {
              before: 200,
              after: 100,
            },
            border: {
              bottom: { style: "single", size: 4, color: "000000" },
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: educationDetails.education_school,
                size: 20,
                bold: true,
              }),
              new TextRun({
                text: `\t${educationDetails.education_location}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${educationDetails.education_degree} - ${educationDetails.education_major}`,
                size: 20,
              }),
              new TextRun({
                text: `\t${educationDetails.education_date}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Work Experience",
                size: 24,
              }),
            ],
            spacing: {
              before: 300,
              after: 100,
            },
            border: {
              bottom: { style: "single", size: 4, color: "000000" },
            },
          }),
          ...parseWorkExperienceJsonToParagraphs(workExperienceDetails),
          new Paragraph({
            children: [
              new TextRun({
                text: "Projects",
                size: 24,
              }),
            ],
            spacing: {
              before: 300,
              after: 100,
            },
            border: {
              bottom: { style: "single", size: 4, color: "000000" },
            },
          }),
          ...parseProjectJsonToParagraphs(projectDetails),
          new Paragraph({
            children: [
              new TextRun({
                text: "Technical Skills",
                size: 24,
              }),
            ],
            spacing: {
              before: 300,
              after: 100,
            },
            border: {
              bottom: { style: "single", size: 4, color: "000000" },
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Programming languages: ${technicalskillsDetails.technicalskills_programminglanguages}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Concepts: ${technicalskillsDetails.technicalskills_concepts}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Applications: ${technicalskillsDetails.technicalskills_applications}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Frameworks: ${technicalskillsDetails.technicalskills_frameworks}`,
                size: 20,
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
        ],
      },
    ],
  });

  function parseProjectJsonToParagraphs(data: any) {
    // const paragraphs = [];

    // const paragraphs: string[] = [];
    const paragraphs: Paragraph[] = [];

    // alternative is
    // interface Paragraph {
    //   text: string;
    //   // any other fields...
    // }

    // const paragraphs: Paragraph[] = [];

    if (data && typeof data === "object") {
      // Check if the data is of type ProjectsArray
      if (data.projects && Array.isArray(data.projects)) {
        // Iterate through each project
        data.projects.forEach((project: Project) => {
          if (project.project_description) {
            // Add project description as a paragraph
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.project_title,
                    bold: true,
                    size: 20,
                  }),
                ],
                spacing: {
                  before: 100,
                  after: 100,
                  line: 240,
                },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.project_description,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: {
                  before: 100,
                  after: 100,
                  line: 240,
                },
              })
            );
          }

          // Process project details
          if (
            project.project_details &&
            Array.isArray(project.project_details)
          ) {
            project.project_details.forEach((detail) => {
              if (detail.project_bullets) {
                // Project bullets
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: detail.project_bullets,
                        size: 20,
                      }),
                    ],
                    bullet: {
                      level: 0,
                    },
                    spacing: {
                      before: 100,
                      after: 100,
                      line: 240,
                    },
                  })
                );
              }
            });
          }
        });
      }
    }

    return paragraphs;
  }

  function parseWorkExperienceJsonToParagraphs(data) {
    const paragraphs = [];

    if (data && typeof data === "object") {
      // Check if the data is of type WorkExperienceArray
      if (data.work_experience && Array.isArray(data.work_experience)) {
        // Iterate through each work experience
        data.work_experience.forEach((experience) => {
          if (experience.workexperience_description) {
            // Add work experience description as a paragraph
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: experience.workexperience_company,
                    bold: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: `\t${experience.workexperience_location}`,
                    size: 20,
                  }),
                ],
                spacing: {
                  before: 100,
                  after: 100,
                  line: 240,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                  },
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: experience.workexperience_jobtitle,
                    italics: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: `\t${experience.workexperience_date}`,
                    size: 20,
                  }),
                ],
                spacing: {
                  before: 100,
                  after: 100,
                  line: 240,
                },
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                  },
                ],
              })
            );
          }

          // Process work experience details
          if (
            experience.workexperience_details &&
            Array.isArray(experience.workexperience_details)
          ) {
            experience.workexperience_details.forEach((detail) => {
              if (detail.workexperience_bullets) {
                // Work experience bullets
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: detail.workexperience_bullets,
                        size: 20,
                      }),
                    ],
                    bullet: {
                      level: 0,
                    },
                    spacing: {
                      before: 100,
                      after: 100,
                      line: 240,
                    },
                  })
                );
              }
            });
          }
        });
      }
    }

    return paragraphs;
  }

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
