import axios, { AxiosError } from "axios";

export interface PostResponse<T> {
  data: T | undefined;
  error?: unknown;
  status: number;
}

function NewResponse<T>(
  data: T | undefined,
  error?: AxiosError | string
): PostResponse<T> {
  if (error) {
    return { data, status: axios.HttpStatusCode.InternalServerError, error };
  }
  return { data, status: axios.HttpStatusCode.Accepted };
}

export async function postRequest<T>(
  url: string,
  params?: any,
  headers?: { [key: string]: string }
): Promise<PostResponse<T>> {
  try {
    const { data, status } = await axios.post<PostResponse<T>>(url, params, {
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
