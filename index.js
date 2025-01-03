// frontend/src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume';

export const getResume = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching resume:', error);
  }
};

export const updateResume = async (resumeData) => {
  try {
    const response = await axios.post(API_URL, resumeData);
    return response.data;
  } catch (error) {
    console.error('Error updating resume:', error);
  }
};
