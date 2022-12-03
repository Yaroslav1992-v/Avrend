import httpService from "./http.service";
const apiEndPoint = "/users/";
const userService = {
  getUsers: async (user) => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
};
export default userService;
