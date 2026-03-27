import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Applications } from "../types";

export function useApplications(): {applications: Applications[], loading: boolean} {
  const [applications, setApplications] = useState<Applications[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      const { data } = await supabase.from('applications').select('*').eq('user_id',user?.id);
      setApplications(data ?? []);
      setLoading(false);
    }
    fetch()

    const subscription = supabase
      .channel('applications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, fetch)
      .subscribe()

    return () => { supabase.removeChannel(subscription) }
  }, []);

  return { applications, loading }
}