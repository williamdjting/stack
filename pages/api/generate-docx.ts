import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from 'docx';

export default async function handler(req, res) {
    console.log("Received request to generate DOCX");

    try {
      const { coverlettercontactinfo, projects} = req.body;
      const nestedJson = { 
        Project: projects,
      }

        console.log("Creating document...");

        const doc = new Document({
          sections: [{
            headers: {first: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: coverlettercontactinfo,
                      bold: true,
                      size: 32,
                      }),
                    ],
                  alignment: AlignmentType.CENTER,
                  border: {
                    bottom: { style: "single", size: 4, color: "000000" },
                  },
                })],
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
                ...parseJsonToParagraphs(nestedJson),
              ]
          }],
      });

      function parseJsonToParagraphs(data) {
        const paragraphs = [];
    
        if (data && typeof data === "object") {
            Object.keys(data).forEach((key) => {
                const value = data[key];
    
                // For the 'Project' key, we need to iterate through its array
                if (key === "Project" && Array.isArray(value)) {
                    value.forEach((project) => {
    
                        // Now process ProjectDetails
                        if (project.ProjectDetails) {
                            const projectDetails = project.ProjectDetails;
    
                            // Title
                            paragraphs.push(
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: projectDetails.title,
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
    
                            // Bullets
                            if (projectDetails.ProjectBullets) {
                                projectDetails.ProjectBullets.forEach(bullet => {
                                    paragraphs.push(new Paragraph({
                                      children: [
                                        new TextRun({
                                          text: ` ${bullet}`,
                                          size: 20,
                                        })
                                      ],
                                      bullet:{
                                        level: 0,
                                      },
                                      spacing: {
                                        before: 200,
                                        after: 200,
                                        line: 240,
                                      },
                                    })
                                    )
                                });
                            }
                        }
                    });
                } else {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: key.charAt(0).toUpperCase() + key.slice(1) + ":",
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                        })
                    );
                    
                    // Handle other keys if needed
                    if (typeof value === "object" && value !== null) {
                        if (Array.isArray(value)) {
                            value.forEach((item) => {
                                paragraphs.push(new Paragraph(item));
                            });
                        } else {
                            paragraphs.push(...parseJsonToParagraphs(value));
                        }
                    } else {
                        paragraphs.push(new Paragraph(value));
                    }
                }
            });
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

//Original version w/o projects

// export default async function handler(req, res) {
//     //const {text} = req.body;
//     //Create a new document
//    const {coverlettercontactinfo, resumeeducation, resumeexperience, resumeprojects, resumeskills, projectData } = req.body;
//   //const projectData = req.body;

//     // const doc = new Document();

//     const doc = new Document({
//       sections:[{
//         headers: {first: new Header({
//           children: [
//             new Paragraph({
//             children: [
//               new TextRun({
//                 text: coverlettercontactinfo,
//                 bold: true,
//                 size: 32,
//               }),
//             ],
//             alignment: AlignmentType.CENTER,
//             border: {
//               bottom: { style: "single", size: 4, color: "000000" },
//             },
//           })],
//         })},
//         properties: {
//           titlePage: true,
//         },
//         children: [
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Education",
//                 size: 24
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: resumeeducation,
//                 bold: true,
//                 size: 20
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//               line: 240,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Work Experience",
//                 size: 24
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: resumeexperience,
//                 bold: true,
//                 size: 20,
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//               line: 240,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Projects",
//                 size: 24
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: resumeprojects,
//                 bold: true,
//                 size: 20,
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//               line: 240,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "Skills",
//                 size: 24
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//             },
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: resumeskills,
//                 bold: true,
//                 size: 20,
//               }),
//             ],
//             spacing: {
//               before: 200,
//               after: 200,
//               line: 240,
//             },
//           }),
//         ],
//       }],
//     });
//     // projectData.Project.forEach(project => {
//     //   const details = project.ProjectDetails;
//     //   doc.addSection({
//     //     children: [
//     //       new Paragraph({
//     //         text: details.title,
//     //         heading: 'Heading1',
//     //       }),
//     //       new Paragraph(details.description),
//     //     ],
//     //   }),
//     //   details.ProjectBullets.forEach(bullet => {
//     //     doc.addSection({
//     //       children: [
//     //         new Paragraph({
//     //           text: bullet,
//     //           bullet: {},
//     //         })
//     //       ]
//     //     })
//     //   })
//     // })

//     const buffer = await Packer.toBuffer(doc);
//     res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

//     // Send the buffer as response
//     res.send(buffer);
//     console.log('Document created successfully!');

// }