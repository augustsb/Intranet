import { HOST_BASE_URL } from 'client/urls/urls';

interface IClientConfig {
  baseApiUrl: string;
  idpServerUrl: string;
  hostBaseUrl: string;
  applicationId: string;
}

export default class ClientConfig {
  public static get config(): IClientConfig {
    const runtimeConfig = window.__runtimeConfigStatic;
    const apiBaseUrl = runtimeConfig?.api_base_url;
    const idpBaseUrl = runtimeConfig?.authentication_server_base_url;

    return {
      baseApiUrl: apiBaseUrl,
      idpServerUrl: idpBaseUrl,
      hostBaseUrl: HOST_BASE_URL,
      applicationId: 'intranet',
    };
  }
}
