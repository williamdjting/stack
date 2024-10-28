// import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from 'docx';

// export default async function handler(req, res) {
//     console.log("Received request to generate DOCX");

//     try {
//       // const { coverlettercontactinfo, projects} = req.body;
//       // const { aiResponse} = req.body;
//       const {educationDetails} = req.body;
//       const nestedJson = { 
//         Project: projects,
//       }

//         console.log("Creating document...");

//         const doc = new Document({
//           sections: [{
//             headers: {first: new Header({
//               children: [
//                 new Paragraph({
//                   children: [
//                     new TextRun({
//                       // text: coverlettercontactinfo,
//                       text: 'name',
//                       bold: true,
//                       size: 32,
//                       }),
//                     ],
//                   alignment: AlignmentType.CENTER,
//                   border: {
//                     bottom: { style: "single", size: 4, color: "000000" },
//                   },
//                 }),
//                 new Paragraph('Degree: ${educationDetails.education_degree}'),
//               ],
//             })},
//             properties: {
//               titlePage: true,
//             },
//               children: [
//                 new Paragraph({
//                   children: [
//                     new TextRun({
//                       text: "Projects",
//                       size: 24
//                     }),
//                   ],
//                 spacing: {
//                 before: 200,
//                 after: 200,
//                 },
//               }),
//                 ...parseJsonToParagraphs(nestedJson),
//               ]
//           }],
//       });

//       function parseJsonToParagraphs(data) {
//         const paragraphs = [];
    
//         if (data && typeof data === "object") {
//             Object.keys(data).forEach((key) => {
//                 const value = data[key];
    
//                 // For the 'Project' key, we need to iterate through its array
//                 if (key === "Project" && Array.isArray(value)) {
//                     value.forEach((project) => {
    
//                         // Now process ProjectDetails
//                         if (project.ProjectDetails) {
//                             const projectDetails = project.ProjectDetails;
    
//                             // Title
//                             paragraphs.push(
//                                 new Paragraph({
//                                     children: [
//                                         new TextRun({
//                                             text: projectDetails.title,
//                                             bold: true,
//                                             size: 20,
//                                         }),
//                                     ],
//                                     spacing: {
//                                       before: 200,
//                                       after: 200,
//                                       line: 240,
//                                     },
//                                 })
//                             );
    
//                             // Bullets
//                             if (projectDetails.ProjectBullets) {
//                                 projectDetails.ProjectBullets.forEach(bullet => {
//                                     paragraphs.push(new Paragraph({
//                                       children: [
//                                         new TextRun({
//                                           text: ` ${bullet}`,
//                                           size: 20,
//                                         })
//                                       ],
//                                       bullet:{
//                                         level: 0,
//                                       },
//                                       spacing: {
//                                         before: 200,
//                                         after: 200,
//                                         line: 240,
//                                       },
//                                     })
//                                     )
//                                 });
//                             }
//                         }
//                     });
//                 } else {
//                     paragraphs.push(
//                         new Paragraph({
//                             children: [
//                                 new TextRun({
//                                     text: key.charAt(0).toUpperCase() + key.slice(1) + ":",
//                                     bold: true,
//                                     size: 28,
//                                 }),
//                             ],
//                         })
//                     );
                    
//                     // Handle other keys if needed
//                     if (typeof value === "object" && value !== null) {
//                         if (Array.isArray(value)) {
//                             value.forEach((item) => {
//                                 paragraphs.push(new Paragraph(item));
//                             });
//                         } else {
//                             paragraphs.push(...parseJsonToParagraphs(value));
//                         }
//                     } else {
//                         paragraphs.push(new Paragraph(value));
//                     }
//                 }
//             });
//         }
    
//         return paragraphs;
//     }

//       const buffer = await Packer.toBuffer(doc);
//       res.setHeader('Content-Disposition', 'attachment; filename=ProjectReport.docx');
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//       res.setHeader('Content-Length', buffer.length);
//       res.send(buffer);
//   } catch (error) {
//       console.error("Error generating DOCX:", error);
//       res.status(500).json({ error: "Failed to generate document" });
//   }
// }
import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from 'docx';

export default async function handler(req, res) {
    console.log("Received request to generate DOCX");

    try {
      // const { coverlettercontactinfo, projects} = req.body;
      // const { aiResponse} = req.body;
      const { aiResponse } = req.body;
      if (!aiResponse || !aiResponse.educationDetails || !aiResponse.projectDetails || !aiResponse.technicalskillsDetails || !aiResponse.workExperienceDetails) {
        return res.status(400).json({ error: 'Missing required details' });
    }
    const {educationDetails, projectDetails, technicalskillsDetails, workExperienceDetails } = aiResponse;
    // const nestedJson = {
    //   Project: P
    // }

        console.log("Creating document...");

        const doc = new Document({
          sections: [{
            headers: {first: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      // text: coverlettercontactinfo,
                      text: 'name',
                      bold: true,
                      size: 32,
                      }),
                    ],
                  alignment: AlignmentType.CENTER,
                  border: {
                    bottom: { style: "single", size: 4, color: "000000" },
                  },
                }),
                new Paragraph("Education Details: "),
                new Paragraph(`Degree: ${educationDetails.education_degree}`),
                new Paragraph(`Degree details: ${educationDetails.education_degree_details}`),
                new Paragraph(`Date: ${educationDetails.education_date}`),
                new Paragraph(`Courses taken: ${educationDetails.education_courses_taken}`),
                new Paragraph(`School name: ${educationDetails.education_school}`),
                new Paragraph(`Location: ${educationDetails.education_location}`),
                new Paragraph("Technical Skills: "),
                new Paragraph(`Programming languages: ${technicalskillsDetails.technicalskills_programminglanguages}`),
                new Paragraph(`Concepts: ${technicalskillsDetails.technicalskills_concepts}`),
                new Paragraph(`Applications: ${technicalskillsDetails.technicalskills_applications}`),
                new Paragraph(`Frameworks: ${technicalskillsDetails.technicalskills_frameworks}`),
              ],
            })},
            properties: {
              titlePage: true,
            },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Projects",
                      size: 24
                    }),
                  ],
                spacing: {
                before: 200,
                after: 200,
                },
              }),
                ...parseProjectJsonToParagraphs(projectDetails),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Work Experience",
                      size: 24
                    }),
                  ],
                spacing: {
                before: 200,
                after: 200,
                },
              }),
              ...parseWorkExperienceJsonToParagraphs(workExperienceDetails),
              ]
          }],
      });

      function parseProjectJsonToParagraphs(data) {
        const paragraphs = [];
    
        if (data && typeof data === "object") {
            // Check if the data is of type ProjectsArray
            if (data.projects && Array.isArray(data.projects)) {
                // Iterate through each project
                data.projects.forEach((project) => {
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
                                before: 200,
                                after: 200,
                                line: 240,
                            },
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: project.project_description,
                                        bold: true,
                                        size: 20,
                                    }),
                                ],
                                spacing: {
                                    before: 200,
                                    after: 200,
                                    line: 240,
                                },
                            })
                        );
                    }
    
                    // Process project details
                    if (project.project_details && Array.isArray(project.project_details)) {
                        project.project_details.forEach(detail => {
                            if (detail.project_bullets) {
                                // Project bullets
                                paragraphs.push(new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: detail.project_bullets,
                                            size: 20,
                                        })
                                    ],
                                    bullet: {
                                        level: 0,
                                    },
                                    spacing: {
                                        before: 200,
                                        after: 200,
                                        line: 240,
                                    },
                                }));
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
                          ],
                          spacing: {
                              before: 200,
                              after: 200,
                              line: 240,
                          },
                          }),
                          new Paragraph({
                              children: [
                                  new TextRun({
                                      text: experience.workexperience_jobtitle,
                                      bold: true,
                                      size: 20,
                                  }),
                              ],
                              spacing: {
                                  before: 200,
                                  after: 200,
                                  line: 240,
                              },
                          })
                      );
                  }
  
                  // Process work experience details
                  if (experience.workexperience_details && Array.isArray(experience.workexperience_details)) {
                      experience.workexperience_details.forEach(detail => {
                          if (detail.workexperience_bullets) {
                              // Work experience bullets
                              paragraphs.push(new Paragraph({
                                  children: [
                                      new TextRun({
                                          text: detail.workexperience_bullets,
                                          size: 20,
                                      })
                                  ],
                                  bullet: {
                                      level: 0,
                                  },
                                  spacing: {
                                      before: 200,
                                      after: 200,
                                      line: 240,
                                  },
                              }));
                          }
                      });
                  }
              });
          }
      }
  
      return paragraphs;
  }
    

      const buffer = await Packer.toBuffer(doc);
      res.setHeader('Content-Disposition', 'attachment; filename=ProjectReport.docx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
  } catch (error) {
      console.error("Error generating DOCX:", error);
      res.status(500).json({ error: "Failed to generate document" });
  }
}
