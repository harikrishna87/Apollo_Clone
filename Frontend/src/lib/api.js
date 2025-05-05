import axios from 'axios';

const API_URL = 'https://apollo-clone-yq62.onrender.com/apollo';

export const fetchDoctors = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/get_all_doctors`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const addDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/add_doctor`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw error;
  }
};