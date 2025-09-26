import { atom, selector } from "recoil";
import { UserRole, type UserType } from "../types/user.types";

export const authUserState = atom<UserType | null>({
  key: "authUserState",
  default: null,
});

export const isAdminSelector = selector({
  key: "isAdmin",
  get: ({ get }) => {
    const user = get(authUserState);
    return user?.role === UserRole.ADMIN;
  },
});
