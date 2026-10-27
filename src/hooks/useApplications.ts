import { useCallback, useEffect, useState } from "react";
import { listApplications, type Application } from "../lib/applicationsApi";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    listApplications().then((result) => {
      if (!active) return;
      if (result.ok) {
        setApplications(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Event handler, not an effect: safe place to flip the loading flag.
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  }, []);

  return { applications, setApplications, loading, error, refetch };
}
