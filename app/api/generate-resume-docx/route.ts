import { NextResponse } from 'next/server';
import generateResume from '../../../lib/docx/generateResume';

export async function POST( req: Request ){
  try {
    const { aiResponse } = await req.json();

    const docxBuffer = await generateResume(aiResponse);

    return new NextResponse(docxBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=generated-resume.docx',
      },
    });
  } catch (error) {
    console.error('Error generating resume:', error);
    return new NextResponse('Failed to generate resume', { status: 500 });
  }
}