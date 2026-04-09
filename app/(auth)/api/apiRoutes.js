import { apiRequest } from "./index";


export const loginDashboard = (params) => {
    return apiRequest(
        {
            url: "/api/admin/auth/login",
            type: "POST",
            params,
        }
    );
};
