import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useInterviews() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch  = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('interviews')
        .select(`
          *,
          applications (
            company,
            role
          )
        `)
        .order('interview_date', { ascending: true });
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