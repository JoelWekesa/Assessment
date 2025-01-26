
import axios from 'axios';

const ApiClient = (token: string) => {
    const baseURL = "http://34.232.254.118:5001/"


    const defaultOptions = {
        baseURL,
        timeout: 150000,
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(async (request) => {
        // const sessionId = await getServerSession(options);

        request.headers.Authorization = `Bearer ${token}`;

        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
    );

    return instance;
};

export default ApiClient;
