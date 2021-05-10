interface IStorageService {
  getToken: () => string | null;
  saveToken: (userToken: string) => string | null;
  removeToken: () => void;
}

class StorageService implements IStorageService {
  private readonly tokenName = 'userToken';

  getToken() {
    try {
      const rawToken = localStorage.getItem(this.tokenName);

      if (rawToken) {
        const token = JSON.parse(rawToken);

        return token;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  checkTokenValidity (expiration: number) {
    return Date.now() >= expiration * 1000;
  }

  saveToken(userToken: string) {
    try {
      const tokenJSON = JSON.stringify(userToken);
      localStorage.setItem(this.tokenName, tokenJSON);

      return userToken;
    } catch (error) {
      return null;
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenName);
  }
}

export default new StorageService();
