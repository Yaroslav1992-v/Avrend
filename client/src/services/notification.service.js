import httpService from "./http.service";
const apiEndPoint = "/notification/";
const notificationService = {
  createNotification: async (notification) => {
    const { data } = await httpService.post(apiEndPoint, notification);
    return data;
  },
  getNotifications: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
  updateNotifications: async (notif, kind) => {
    const { data } = await httpService.patch(apiEndPoint, {
      notif,
      type: kind,
    });
    return data;
  },
  deleteNotificationBySender: async (id, type) => {
    const { data } = await httpService.delete(apiEndPoint, {
      data: { id, type },
    });
    return data;
  },
  delMsgNots: async (id, type) => {
    const { data } = await httpService.delete(apiEndPoint, {
      data: {
        id,
        type,
      },
    });
  },
  deleteNotifications: async (type, from, typeId) => {
    const { data } = await httpService.delete(apiEndPoint, {
      data: {
        type: type,
        from: from ? from : "",
        typeId: typeId ? typeId : "",
      },
    });
    return data;
  },
};
export default notificationService;
