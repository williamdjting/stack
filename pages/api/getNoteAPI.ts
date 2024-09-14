// pages/api/notes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/app/lib/supabase/server';

// const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // const supabase = createClient();  // Call createClient() within the request scope
    const { data, error } = await supabase.from("notes1").select();
    console.log('Supabase Data:', data);
    console.log('Supabase Error:', error);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: err.message || 'An unexpected error occurred.' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}