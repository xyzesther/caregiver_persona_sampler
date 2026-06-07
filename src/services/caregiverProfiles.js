import Papa from 'papaparse';

export const CAREGIVER_PROFILES_PATH = '/data/caregiver_profiles_cleaned.csv';

export function isValidCaregiverProfile(row) {
  return Boolean(row?.Name && row?.Age_Group);
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
        const normalizedRows = rows.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key.trim(), value])
          )
        );
        resolve(normalizedRows.filter(isValidCaregiverProfile));
      },
      error: (error) => reject(error),
    });
  });
}
