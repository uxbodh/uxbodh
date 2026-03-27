import { apiRequest } from "./index";


export const sendEnquiryForm = (params) => {
    return apiRequest(
        {
            url: "/api/contact",
            type: "POST",
            params,
        }
    );
};
