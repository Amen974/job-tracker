import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading ] = useState<boolean>(true);
  useEffect(()=>{
    const getDatat = async () => {
      setLoading(true);
      const {data} = await supabase.from('applications').select('*');
      setApplications(data ?? []);
      setLoading(false);
    }
    getDatat()
  },[]);

  return {applications, loading}
}