export type AuthResponse = {
  token: string;
  refreshToken: string;
  userId?: string;
  name: string;
  message?: string;
  mail?: string;
  loginTime?: number;
};

export type UserData = {
  token: string;
  refreshToken: string;
  id: string;
  name: string;
  mail: string;
  loginTime: number;
};
