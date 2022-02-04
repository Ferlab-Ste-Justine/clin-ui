import { useKeycloak } from '@react-keycloak/web';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createAuthHeaderValueForToken } from '../utils/helper';

export const useAxiosWithAuth = (config?: AxiosRequestConfig): AxiosInstance => {
  const { keycloak } = useKeycloak();
  const configOrDefault = config ?? {};
  return axios.create({
    ...configOrDefault,
    headers: {
      ...(configOrDefault.headers || {}),
      Authorization: createAuthHeaderValueForToken(keycloak.token),
    },
  });
};
