const TEST_AUTH = import.meta.env.VITE_TEST_AUTH;

const API_BASE_URL = "http://localhost:8080/api/health/profile";

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TEST_AUTH}`,
      ...options.headers,
    },
  });
  return response;
};

export const getProfile = () => apiFetch("getHealthProfile");

export const updateProfile = (data) =>
  apiFetch("setHealthProfile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
