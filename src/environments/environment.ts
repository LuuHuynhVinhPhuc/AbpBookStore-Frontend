import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Default_Template',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44332/',
    redirectUri: baseUrl,
    clientId: 'Default_Template_App',
    responseType: 'code',
    scope: 'offline_access Default_Template',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44332',
      rootNamespace: 'Default_Template',
    },
  },
} as Environment;
