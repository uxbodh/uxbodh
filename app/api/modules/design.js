import { apiGet, apiPost, apiPut, apiDelete } from "../apiMethods";

/**
 * Fetch the list of departments
 * @returns {Promise<Object>} - Returns departments list
 */
export const fetchAccessList = async () => {
  try {
    const response = await apiGet("access/list");
    return response;
  } catch (error) {
    console.error("Error fetching department list:", error);
    throw error;
  }
};



