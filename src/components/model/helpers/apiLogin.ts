import { HOST } from './apiHelpers';
import { LoginData, RefreshResponse } from '../../types/loginTypes';
import { Path } from '../../types';

export const refreshToken = async (user: LoginData) => {
  const url = `${HOST}${Path.users}/${user.id}${Path.tokens}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user.refreshToken}`,
    },
  });

  const { ok, status } = res;
  let data: RefreshResponse | undefined;
  if (ok) {
    data = (await res.json()) as RefreshResponse;
  }

  return { ok, status, data };
};
