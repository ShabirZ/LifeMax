const TEST_AUTH = import.meta.env.VITE_TEST_AUTH;
// temporary until we have auth working

const API_BASE_URL = "http://localhost:8080/api/finance";

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

export const getBudgets = () => apiFetch("getBudgets");

// body: { category: string, amount: number }
export const createBudget = (body) =>
  apiFetch("createBudget", { method: "POST", body: JSON.stringify(body) });

// body: { category: string }
export const deleteBudget = (body) =>
  apiFetch("deleteBudget", { method: "DELETE", body: JSON.stringify(body) });

// body: { category: string, amount: number }
export const updateBudget = (body) =>
  apiFetch("updateBudget", { method: "PATCH", body: JSON.stringify(body) });
