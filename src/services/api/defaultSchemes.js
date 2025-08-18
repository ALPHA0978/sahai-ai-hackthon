import { fetchGovernmentSchemes } from './openRouter';

export const getDefaultSchemes = async () => {
  const defaultProfile = {
    location: "India",
    category: "General",
    age: 30,
    occupation: "General",
    income: "Below 5 Lakh"
  };

  try {
    const schemes = await fetchGovernmentSchemes(defaultProfile);
    return schemes.slice(0, 5);
  } catch (error) {
    console.error('Error fetching default schemes:', error);
    return [];
  }
};