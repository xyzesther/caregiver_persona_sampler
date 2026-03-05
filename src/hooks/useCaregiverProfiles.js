import { useEffect, useState } from 'react';
import { CAREGIVER_PROFILES_PATH, fetchCaregiverProfiles } from '../services/caregiverProfiles';

export function useCaregiverProfiles(dataPath = CAREGIVER_PROFILES_PATH) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    setError(null);

    fetchCaregiverProfiles(dataPath)
      .then((rows) => {
        if (!isActive) return;
        setProfiles(rows);
        setLoading(false);
      })
      .catch((err) => {
        if (!isActive) return;
        setProfiles([]);
        setError(err);
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [dataPath]);

  return { profiles, loading, error };
}
