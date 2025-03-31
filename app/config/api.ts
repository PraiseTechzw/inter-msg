import Constants from 'expo-constants';

// Hardcoded API URL
export const API_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    VERIFY_TOKEN: `${API_URL}/auth/verify`,
  },
  USER: {
    PROFILE: `${API_URL}/users/profile`,
    UPDATE_PROFILE: `${API_URL}/users/profile/update`,
  },
  CHAT: {
    MESSAGES: `${API_URL}/chat/messages`,
    SEND: `${API_URL}/chat/send`,
  },
};

// Default export to satisfy the route requirement
export default ENDPOINTS; 