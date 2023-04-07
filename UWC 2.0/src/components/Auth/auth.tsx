import { backOfficerData } from "../../data/data";

export interface User {
    username: string;
    password: string;
}

export const validateLogin = (input: User) => {
    const foundUser = backOfficerData.find((u) => u.username === input.username && u.password === input.password);
    if (foundUser) {
      return foundUser.id;
    }
    else {
      return false;
    }
}

export const getLoggedInUser = () => {
    const user = localStorage.getItem("userID");
    if (user) {
      return JSON.parse(user);
    }
    return null;
}