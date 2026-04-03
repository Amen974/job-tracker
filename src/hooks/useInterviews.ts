import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Interview } from "../types";

export function useInterviews(): {interviews: Interview[], loading: boolean} {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch  = async () => {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      const { data } = await supabase
        .from('interviews')
        .select(`
          *,
          applications (
            company,
            role,
            status,
            date_applied,
            job_url,
            notes
          )
        `)
        .order('interview_date', { ascending: true })
        .eq('user_id',user?.id);
      setInterviews(data ?? []);
      setLoading(false);
    }
    fetch();

    const subscription = supabase
    .channel('interviews')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'interviews' }, fetch)
    .subscribe()

    return () => { supabase.removeChannel(subscription) }
  }, []);

  return { interviews, loading }
}