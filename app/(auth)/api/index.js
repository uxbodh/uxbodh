const axios = require("axios");

export async function apiRequest({
    url = "",
    type,
    params = {},
    headers,
}) {
    try {
        const headersData = headers || { "content-type": "application/json" };

        const axiosOptions = {
            url: url,
            method: type, // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: headersData,
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };

        if (type === "GET") {
            axiosOptions.params = params;
        } else {
            axiosOptions.data = params;
        }

        const response = await axios(axiosOptions);
        if (response.status === 200) {
            return { statusCode: 200, data: response.data };
        } else {
            return { statusCode: response.status, data: response.data };
        }
    } catch (error) {
        console.log("request failed-------------------->", error); // message.error(error?.response?.data?.error);
        return {
            statusCode: error.response.status,
            data: error.response ? error.response.data : {},
        };
    }
}
