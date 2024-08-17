
// 1

"use server"

import { createClient } from '/src/app/lib/supabase/server';

export async function Notes() {
  const supabase = createClient();
  const { data: notes1 } = await supabase.from("notes2").select();

  return <pre>{JSON.stringify(notes1, null, 2)}</pre>
}


