import Papa from 'papaparse';

export const CAREGIVER_PROFILES_PATH = '/data/selected_12_caregiver_profiles_0201.csv';

export function isValidCaregiverProfile(row) {
  return Boolean(row?.Name && row?.Profile_ID);
}

export async function fetchCaregiverProfiles(path = CAREGIVER_PROFILES_PATH) {
  const response = await fetch(path);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = Array.isArray(results.data) ? results.data : [];
        resolve(rows.filter(isValidCaregiverProfile));
      },
      error: (error) => reject(error),
    });
  });
}
