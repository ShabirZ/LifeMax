const TEST_AUTH = "<INSERT_TOKEN>";
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

export const getTransactions = () => apiFetch("getTransactions");

// body: { amount: number, category: string, transactionDate: string (YYYY-MM-DD), description?: string }
export const createTransaction = (body) =>
  apiFetch("createTransaction", { method: "POST", body: JSON.stringify(body) });

// body: { transactionId: number, amount?: number, category?: string, transactionDate?: string, description?: string }
export const updateTransaction = (body) =>
  apiFetch("updateTransaction", { method: "PATCH", body: JSON.stringify(body) });

// file: File (CSV)
export const importTransactions = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch("importTransactions", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${TEST_AUTH}` }, // omit Content-Type so browser sets multipart boundary
  });
};
