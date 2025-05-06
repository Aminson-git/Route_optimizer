const API_BASE_URL = 'http://localhost:8080/api';

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const optimizeRoute = async (countryCodes, iterations) => {
  try {
    const response = await fetch(`${API_BASE_URL}/optimize?iterations=${iterations}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(countryCodes),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error optimizing route:', error);
    throw error;
  }
};