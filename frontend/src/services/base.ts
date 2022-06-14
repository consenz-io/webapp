import axios, { AxiosRequestConfig } from "axios";

const httpRequest = axios.create();

const _getRequest = (query: string, config: AxiosRequestConfig<any> | undefined) =>
  () => httpRequest.get(query, config);
const _postRequest = (path: string, body: any, config: AxiosRequestConfig<any> | undefined) =>
  () => httpRequest.post(path, body, config);
const _putRequest = (path: string, body: any, config: AxiosRequestConfig<any> | undefined) =>
  () => httpRequest.put(path, body, config);
const _deleteRequest = (path: string, config: AxiosRequestConfig<any> | undefined) =>
  () => httpRequest.delete(path, config);

export const getRequest = (query: string, config?: undefined) =>
  ErrorHandler(_getRequest(query, config));
export const postRequest = (path: any, body: any, config: any) =>
  ErrorHandler(_postRequest(path, body, config));
export const putRequest = (path: any, body: any, config: any) =>
  ErrorHandler(_putRequest(path, body, config));
export const deleteRequest = (path: any, config: any) =>
  ErrorHandler(_deleteRequest(path, config));

const ErrorHandler = async (requestHandler: any) => { //TODO: better type
  try {
    return await requestHandler();
  } catch (err: any) { //TODO: better type
    const errorCode = err.response.data.data.errorCode;

    if (errorCode) {
      console.log(`Error Code: ${errorCode}`);
			
      return errorCode;
    }

    const readableError = err.toJSON().message;
    console.log(`Http Request Error: ${readableError}`);
		
    return readableError;
  }
};