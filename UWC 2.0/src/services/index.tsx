import { HttpClientImpl } from "../utilities/http_client";
import { MeetServiceImpl } from "./meet";

const httpClient = new HttpClientImpl(process.env.BASE_URL ?? "");

export const MeetService = new MeetServiceImpl(httpClient);
