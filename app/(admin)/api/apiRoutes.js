import { apiRequest } from "./index";

export const logoutDashboard = (params) => {
    return apiRequest(
        {
            url: "/api/admin/auth/logout",
            type: "POST",
            params,
        }
    );
};

export const getUserList = () => {
    return apiRequest(
        {
            url: "/api/admin/user/list",
            type: "GET",
        }
    );
};

export const addUser = (params) => {
    return apiRequest(
        {
            url: "/api/admin/user/create",
            type: "POST",
            params
        }
    );
};

export const updateUser = (params, id) => {
    return apiRequest(
        {
            url: `/api/admin/user/edit/${id}`,
            type: "PUT",
            params
        }
    );
};

export const getSampleUploadList = () => {
    return apiRequest(
        {
            url: `/api/admin/sampleUpload/list`,
            type: "GET",
        }
    );
};

export const createSampleImageUpload = (params) => {
    return apiRequest(
        {
            url: `/api/admin/sampleUpload/create`,
            type: "POST",
            params
        }
    );
};

export const updateSampleImageUpload = (params, id) => {
    return apiRequest(
        {
            url: `/api/admin/sampleUpload/edit/${id}`,
            type: "PATCH",
            params
        }
    );
};

export const updateSampleImageStatus = ({params, id}) => {
    return apiRequest(
        {
            url: `/api/admin/sampleUpload/status/${id}`,
            type: "PATCH",
            params
        }
    );
};

export const deleteSampleImageUpload = ({params, id}) => {
    return apiRequest(
        {
            url: `/api/admin/sampleUpload/delete/${id}`,
            type: "DELETE",
        }
    );
};
