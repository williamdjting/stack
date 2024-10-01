import {Document, Packer, Paragraph, TextRun } from 'docx';

export default async function handler(req, res) {
  //Create a new document
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun("Hello, this is a DOCX document."),
            new TextRun({
              text: "\nThis is a new line.",
              break: 1,
            })
          ]
        })
      ]
    }]
  })

  const buffer = await Packer.toBuffer(doc);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
  res.send(buffer);
}