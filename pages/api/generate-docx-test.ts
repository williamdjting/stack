import {Document, Packer, Paragraph, TextRun } from 'docx';

export default async function handler(req, res) {
  if(req.method === 'POST'){
    const {text} = req.body;
    //Create a new document
    const doc = new Document({
      sections:[{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(text || "No text provided."),
            ],
          }),
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
    res.send(buffer);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method $[req.method] Not Allowed');
    }

}