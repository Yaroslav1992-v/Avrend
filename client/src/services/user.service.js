import httpService from "./http.service";
const apiEndPoint = "/users/";
const userService = {
  getUsers: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
  updateUser: async (content, userId) => {
    const { data } = await httpService.patch(
      `${apiEndPoint}${userId}`,
      content
    );
    return data;
  },
};
export default userService;
