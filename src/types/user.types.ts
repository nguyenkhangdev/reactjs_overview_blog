export const UserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserType {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export interface SigninType {
  email: string;
  password: string;
}
