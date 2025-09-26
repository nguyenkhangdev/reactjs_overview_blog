import type { SigninType } from "../types/user.types";
import { api } from "./axios";

export const signIn = async (data: SigninType) => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
