import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from 'docx';

export default async function generateCL(aiResponse: Record<string, any>) {
    console.log("Received request to generate cover letter DOCX");

    const today = new Date();
    const formattedDate =  today.toISOString().split('T')[0];

    // const { aiResponse } = req.body;

    // if (!aiResponse || !aiResponse.coverLetterDetails ) {
    //   return res.status(400).json({ error: 'Missing required fields for cover letter' });
    // }

    const { coverLetterDetails } = aiResponse;

      console.log("Creating cl document...");

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: coverLetterDetails.applicant_name,
                  bold: true,
                  size: 20
                })
              ],
              spacing: {
                before: 300,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${coverLetterDetails.applicant_phone} | ${coverLetterDetails.applicant_email}`,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: formattedDate,
                  bold: true,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${coverLetterDetails.company_name} - ${coverLetterDetails.position_title}`,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Dear Hiring Manager,",
                  size: 20
                })
              ],
              spacing: {
                before: 500,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  //This should come from the AI
                  text: coverLetterDetails.introduction,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200,
                line: 240,
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  //This should come from the AI
                  text: coverLetterDetails.body,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200,
                line: 240,
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  //This should come from the AI
                  text: coverLetterDetails.closing,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200,
                line: 240,
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Sincerely,",
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: coverLetterDetails.applicant_name,
                  size: 20
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            }),
          ]
        }]
      });

      const buffer = await Packer.toBuffer(doc);
      return buffer;
}