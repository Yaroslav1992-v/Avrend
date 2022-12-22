import httpService from "./http.service";
const apiEndPoint = "/message/";
const messageService = {
  sendMessage: async (msg) => {
    const { data } = await httpService.post(apiEndPoint, msg);
    return data;
  },
  loadMessages: async (chaId) => {
    const { data } = await httpService.get(apiEndPoint + chaId);
    return data;
  },
};
export default messageService;
