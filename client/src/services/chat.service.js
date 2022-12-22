import httpService from "./http.service";
const apiEndPoint = "/chat/";
const chatService = {
  accessChat: async (id) => {
    const { data } = await httpService.post(apiEndPoint, { userId: id });
    return data;
  },
  loadChats: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
};
export default chatService;
