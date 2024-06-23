import BaseClass from "./base.class";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AppError } from "../models/error.model";
import { BaseHttpResponse } from "./base.type";

class BaseHttpService<T> extends BaseClass {
  protected baseURL = "";

  constructor(baseURL = "") {
    super();
    this.baseURL = baseURL;
  }

  public async post(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    const data = await this.request(HttpMethod.POST, url, options);
    return data;
  }

  public async get(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    const data = await this.request(HttpMethod.GET, url, options);
    return data;
  }

  public async put(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    const data = await this.request(HttpMethod.PUT, url, options);
    return data;
  }

  public async patch(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    const data = await this.request(HttpMethod.PATCH, url, options);
    return data;
  }

  public async delete(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    const data = await this.request(HttpMethod.DELETE, url, options);
    return data;
  }

  public async request(
    method: HttpMethod,
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<BaseHttpResponse<T>> {
    try {
      const response = await axios.request<T>({
        method,
        baseURL: this.getBaseURL(),
        url,
        ...options,
      });
      return {
        headers: response.headers,
        data: response.data,
      };
    } catch (axiosError) {
      const error = axiosError as AxiosError<any>;
      if (error.response) {
        throw new AppError(error.response.data.message);
      } else {
        throw axiosError;
      }
    }
  }

  protected getBaseURL(): string {
    return "";
  }
}

enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export default BaseHttpService;
