export {};
declare global {
  interface Window {
    __runtimeConfigStatic: {
      api_base_url: string;
      authentication_server_base_url: string;
    };
  }
}
