import { backOfficerData } from "../../data/data";

export const validateLogin = (username: string, password: string) => {
  const foundUser = backOfficerData.find((u) => u.username === username && u.password === password);
  if (foundUser) {
    return foundUser;
  }
  else {
    return false;
  }
}
