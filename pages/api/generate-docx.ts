import {Document, Packer, Paragraph, TextRun, Header, Alignment, AlignmentType } from 'docx';

export default async function handler(req, res) {
    //const {text} = req.body;
    //Create a new document
    const {coverlettercontactinfo, resumeeducation, resumeexperience, resumeprojects, resumeskills } = req.body;

    const doc = new Document({
      sections:[{
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
                text: "Education",
                size: 24
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeeducation,
                bold: true,
                size: 20
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
                text: "Work Experience",
                size: 24
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeexperience,
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
                text: "Projects",
                size: 24
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeprojects,
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
                text: "Skills",
                size: 24
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeskills,
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
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // Send the buffer as response
    res.send(buffer);
    console.log('Document created successfully!');

}