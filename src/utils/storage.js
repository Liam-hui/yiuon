import { AsyncStorage } from 'react-native';

const prefix = '@AppName:';

// const storageKeys = {
//   token: `${prefix}token`,
// };

export default {
  setToken: async (token) => AsyncStorage.setItem('token', token),
  getToken: async () => AsyncStorage.getItem('token'),
  removeToken: async () => AsyncStorage.removeItem('token'),
};
