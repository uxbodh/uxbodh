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

export const getDesignPageList = () => {
    return apiRequest(
        {
            url: `/api/admin/design/list`,
            type: "GET",
        }
    );
};

export const createDesignPage = (params) => {
    return apiRequest(
        {
            url: `/api/admin/design/design-page/create`,
            type: "POST",
            params
        }
    );
};

export const createDesignDetailPage = (params) => {
    return apiRequest(
        {
            url: `/api/admin/design/design-detail-page/create`,
            type: "POST",
            params
        }
    );
};

export const updateDesignPageStatus = ({params, id}) => {
    return apiRequest(
        {
            url: `/api/admin/design/status/${id}`,
            type: "PATCH",
            params
        }
    );
};

export const updateDesignPage = (params, id) => {

    return apiRequest(
        {
            url: `/api/admin/design/design-page/edit/${id}`,
            type: "PUT",
            params
        }
    );
};

export const updateDesignDetailPage = (params, id) => {
    return apiRequest(
        {
            url: `/api/admin/design/design-detail-page/edit/${id}`,
            type: "PUT",
            params
        }
    );
};

export const deleteDesignPage = ({params, id}) => {
    return apiRequest(
        {
            url: `/api/admin/design/design-page/delete/${id}`,
            type: "DELETE",
        }
    );
};

export const getBlogList = () => {
    return apiRequest(
        {
            url: `/api/admin/blog/list`,
            type: "GET",
        }
    );
};

export const createBlog = (params) => {
    return apiRequest(
        {
            url: `/api/admin/blog/create`,
            type: "POST",
            params
        }
    );
};

export const updateBlog = (params, id) => {
    return apiRequest(
        {
            url: `/api/admin/blog/edit/${id}`,
            type: "PUT",
            params
        }
    );
};