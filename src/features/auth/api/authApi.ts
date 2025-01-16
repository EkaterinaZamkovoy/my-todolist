import { instance } from 'common/instance/instance';
import { LoginArgs } from './authApi.types';
import { BaseResponse } from 'common/types';

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(
      'auth/login',
      payload
    );
  },
};
