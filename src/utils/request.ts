import axios, { AxiosRequestConfig } from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtbXhkeGxvayIsImlhdCI6MTY3Nzk5Mzk5MywiZXhwIjoxNjc4MzUzOTkzfQ.WftE2b_PJnKbisbtAGWocwPH8Vy0XbO1qJ1O5hoTIPo"
axios.defaults.timeout = 10000;
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}


export const createInstance = (baseUrl:string) => {
  const instance = axios.create({
		baseURL: baseUrl || '',
	});

  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("请求出错：", error);
    }
  );
  return instance
}
