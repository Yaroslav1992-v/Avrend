import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const apiEndPoint = "/auth/";
const authService = {
  register: async (user) => {
    const data = await httpService.post(`${apiEndPoint}signUp`, {
      ...user,
    });

    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(`${apiEndPoint}signIn`, {
      email,
      password,
    });

    return data;
  },
  refreshToken: async () => {
    try {
      const { data } = await httpService.post(`${apiEndPoint}token`, {
        grant_type: "refresh_token",
        refresh_token: localStorageService.getRefreshToken(),
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authService;
