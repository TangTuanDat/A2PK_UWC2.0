import { getRequest, GetResponse } from "./get";
import urlJoin from "url-join";
import { postRequest, PostResponse } from "./post";
import { KeyMap } from "../types";

export interface HttpClient {
  get<T>(
    url: string,
    query?: KeyMap,
    headers?: KeyMap
  ): Promise<GetResponse<T>>;
  post<T>(
    url: string,
    query?: KeyMap,
    headers?: KeyMap
  ): Promise<PostResponse<T>>;
}

export class HttpClientImpl implements HttpClient {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  DefaultHeaders = {
    Accept: "application/json",
  };

  private path(url: string): string {
    return urlJoin(this.baseUrl, url);
  }

  post<T>(
    url: string,
    headers: KeyMap = this.DefaultHeaders,
    query?: KeyMap | undefined
  ): Promise<PostResponse<T>> {
    return postRequest(this.path(url), query, headers);
  }

  get<T>(
    url: string,
    headers: KeyMap = this.DefaultHeaders,
    query?: KeyMap
  ): Promise<GetResponse<T>> {
    return getRequest(this.path(url), headers, query);
  }
}
