// pages/api/insertNote.ts

`use server`

import { NextApiRequest, NextApiResponse } from 'next';
import { insertNote } from '@/app/lib/supabase/insertNote';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { jobtitle, company, jobdescription, resumexperience, resumeprojects, resumeskills, resumeeducation, coverlettercontactinfo, coverletterstylerequest } = req.body;

    const { data, error } = await insertNote(jobtitle, company, jobdescription, resumexperience, resumeprojects, resumeskills, resumeeducation, coverlettercontactinfo, coverletterstylerequest);

    if (error) {
      return res.status(500).json({ error: 'Failed to insert note' });
    }

    return res.status(200).json({ data });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
