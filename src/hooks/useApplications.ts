import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from('applications').select('*');
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