import { HttpClient } from "../../utilities/http_client";
import { GetResponse } from "../../utilities/http_client/get";

export interface MeetProps {
  id: string;
}

const GetPath = "/meet";

export interface MeetService {
  getMeet(id: string): Promise<GetResponse<MeetProps>>;
  createMeet(meet: MeetProps): Promise<MeetProps>;
  updateMeet(id: string, meet: MeetProps): Promise<MeetProps>;
  deleteMeet(id: string): void;
}

export class MeetServiceImpl implements MeetService {
  client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }
  async getMeet(id: string): Promise<GetResponse<MeetProps>> {
    return this.client.get<MeetProps>(GetPath + "/" + id);
  }
  async createMeet(meet: MeetProps): Promise<MeetProps> {
    throw new Error("Method not implemented.");
  }
  async updateMeet(id: string, meet: MeetProps): Promise<MeetProps> {
    throw new Error("Method not implemented.");
  }
  async deleteMeet(id: string): Promise<Error | void> {
    throw new Error("Method not implemented.");
  }
}
