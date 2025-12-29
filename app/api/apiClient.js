const BASE_URL = process.env.NEXT_PUBLIC_Base_Api_Href_Url; // replace with your API base

// ✅ Helper to handle API responses
const handleResponse = async (response) => {

  console.log(response, "345678765432134567")
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// ✅ Helper to set headers (with token if needed)
// const getHeaders = () => {
//   // Token is stored in localStorage by Redux authSlice
//   const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: Bearer ${token} }),
//   };
// };

export const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  if (isFormData) {
    // For FormData we do NOT set Content-Type
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


export { BASE_URL, handleResponse, getHeaders };