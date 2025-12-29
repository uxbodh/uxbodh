import { BASE_URL, handleResponse, getHeaders } from "./apiClient";

// ✅ 1. GET
export const apiGet = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(response);
};

// ✅ 2. POST
export const apiPost = async (endpoint, body = {}) => {
  // Check if body is FormData
  const isFormData = body instanceof FormData;
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });

  return handleResponse(response);
};

// ✅ 3. PUT
export const apiPut = async (endpoint, body = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// ✅ 4. PATCH
export const apiPatch = async (endpoint, body = {}) => {
  // Check if body is FormData
  const isFormData = body instanceof FormData;
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: getHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });

  return handleResponse(response);
};

// ✅ 5. DELETE
export const apiDelete = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const response = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response);
};