import { atom } from "recoil";
import type { UserType } from "../types/user.types";

export const authUserState = atom<UserType | null>({
  key: "authUserState",
  default: null,
});
