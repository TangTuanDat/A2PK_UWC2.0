import axios, { AxiosError } from "axios";
import { KeyMap } from "../types";

export interface GetResponse<T> {
  data: T | undefined;
  error?: unknown;
  status: number;
}

function NewResponse<T>(
  data: T | undefined,
  error?: AxiosError | string
): GetResponse<T> {
  if (error) {
    return { data, status: axios.HttpStatusCode.InternalServerError, error };
  }
  return { data, status: axios.HttpStatusCode.Accepted };
}

export async function getRequest<T>(
  url: string,
  headers: { [key: string]: string },
  params?: KeyMap
): Promise<GetResponse<T>> {
  try {
    const { data, status } = await axios.get<GetResponse<T>>(url, {
      params: params,
      headers: headers,
    });
    console.log("status", status);
    console.log("data", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return NewResponse<T>(undefined, error);
    } else {
      console.log("unexpected error: ", error);
      return NewResponse<T>(undefined, "An unexpected error occurred");
    }
  }
}
