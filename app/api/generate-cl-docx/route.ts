import { NextResponse } from 'next/server';
import generateCL from '../../../lib/docx/generateCL';

export async function POST( req: Request ){
  try {
    const { aiResponse } = await req.json();

    const docxBuffer = await generateCL(aiResponse);

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