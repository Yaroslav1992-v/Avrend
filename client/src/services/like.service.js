import httpService from "./http.service";

const apiEndPoint = "/like/";
const likeService = {
  likeComment: async (like) => {
    const { data } = await httpService.post(apiEndPoint + "comment", like);
    return data;
  },
  likePost: async (like) => {
    const { data } = await httpService.post(apiEndPoint + "post", like);
    return data;
  },
  getCommentLikes: async () => {
    const { data } = await httpService.get(apiEndPoint + "comment");
    return data;
  },
  getPostLikes: async () => {
    const { data } = await httpService.get(apiEndPoint + "post");
    return data;
  },
  removeLikeFromComment: async (likeId) => {
    const { data } = await httpService.delete(
      apiEndPoint + "comment/" + likeId
    );
    return data;
  },
  removeLikeFromPost: async (likeId) => {
    const { data } = await httpService.delete(apiEndPoint + "post/" + likeId);
    return data;
  },
};
export default likeService;
