import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: '', // Pode ser configurado dinamicamente
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para requisições
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Aqui você pode adicionar headers globais, como token de autenticação
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para respostas
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Aqui você pode tratar erros globais
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  public async post<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<ApiResponse<R>> {
    const response = await this.axiosInstance.post<R>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  public async put<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<ApiResponse<R>> {
    const response = await this.axiosInstance.put<R>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  public async delete<R>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<R>> {
    const response = await this.axiosInstance.delete<R>(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}

// Export do singleton
export const api = ApiService.getInstance();
