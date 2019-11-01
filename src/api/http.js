import axios from "axios";
axios.defaults.withCredentials = true; //携带cookie
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded; charset=utf-8";
let instance = axios.create({
    withCredentials: true,
    transformRequest: [
        function(data) {
            // 请求参数的格式
            let newData = "";
            for (let k in data) {
                newData +=
                    encodeURIComponent(k) +
                    "=" +
                    encodeURIComponent(data[k]) +
                    "&";
            }
            return newData;
        }
    ]
});
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http响应拦截器
instance.interceptors.response.use(
    data => {
        return data;
    },
    error => {
        return Promise.reject(error);
    }
);
export default instance;
