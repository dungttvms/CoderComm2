import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", { error });
    //--------------------------------------------------------------------
    // return Promise.reject(error);//-----Hay sử dụng cách này
    //--------------------------------------------------------------------

    //---------------Cách này dựa trên thông báo lỗi trả về của API này---------------
    const message = error.response?.data?.errors?.message || "Unknown Error";
    return Promise.reject({ message });
    //--------------------------------------------------------------------------------
  }
);

export default apiService;
