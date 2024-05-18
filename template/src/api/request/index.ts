import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean;
    error?: boolean;
  }
}

enum RequestCodeEnums {
  SUCCESS = 200,
}

class Request {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create();
    this.init();
  }

  private init() {
    this.setDefaultConfig();
    this.setRequestInterceptor();
    this.setResponseInterceptor();
  }
  private setDefaultConfig() {
    // 设置默认的超时时间
    this.axiosInstance.defaults.timeout = 10e3;
  }

  private setRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(config => {
      // TODO 要改成从登录后的token里面获取
      config.headers.Authorization = 'Bearer ' + 'token';
      config.headers.version = '1.1.1';
      return config;
    });
  }

  private setResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          const {code, message, data} = response.data;
          if (code === RequestCodeEnums.SUCCESS) {
            return Promise.resolve(data);
          } else {
            // 需要处理异常message 展示toast
            return Promise.reject(message);
          }
        } else {
          return Promise.reject(response.data);
        }
      },
      error => {
        if (error.response.status) {
          switch (error.response.status) {
            case 401:
              // TODO 跳转登录页面
              break;
            case 403:
              // TODO 跳转没有权限页面
              break;
            case 404:
              // TODO 跳转404页面
              break;
            default:
              // TODO 跳转500页面
              break;
          }
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }
  public async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {loading: true, error: true},
  ): Promise<T> {
    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }
}

export default new Request();
