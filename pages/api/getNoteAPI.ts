// pages/api/notes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/app/lib/supabase/server';

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase.from("notes1").select();

    console.log('Supabase query data:', data);
    console.error('Supabase query error:', error);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    // Ensure to return JSON
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
