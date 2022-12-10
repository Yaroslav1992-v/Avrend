import httpService from "./http.service";

const apiEndPoint = "/comment/";
const commentService = {
  getComments: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
  postComment: async (comment) => {
    const { data } = await httpService.post(apiEndPoint, comment);
    return data;
  },
  updateComment: async (comment, commentId) => {
    const { data } = await httpService.patch(apiEndPoint + commentId, comment);
    return data;
  },
  removeComment: async (commentId, postId) => {
    const { data } = await httpService.delete(
      apiEndPoint + postId + "/" + commentId
    );
    return data;
  },
};

export default commentService;
