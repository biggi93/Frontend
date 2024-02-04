export default {
  oidc: {
    clientId: 'XXX',
    issuer: 'https://dev-XXX.okta.com/oauth2/default',
    redirectUri: 'https://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
