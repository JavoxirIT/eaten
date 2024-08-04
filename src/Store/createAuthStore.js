import createStore from 'react-auth-kit/createStore';

const createAuthStore = createStore({
  authName: '_auth',
  authType: 'localstorage',
  //   cookieDomain: window.location.hostname,
  //   cookieSecure: window.location.protocol === 'https:',
});

export default createAuthStore;
