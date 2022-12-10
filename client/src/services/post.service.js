import httpService from "./http.service";
const apiEndPoint = "/post/";
const postService = {
  createPost: async (payload) => {
    const { data } = await httpService.post(apiEndPoint, payload);
    return data;
  },
  deletePost: async (postId) => {
    const { data } = await httpService.delete(apiEndPoint + postId);
    return data;
  },
  updatePost: async (post, postId) => {
    const { data } = await httpService.patch(apiEndPoint + postId, post);
    return data;
  },
  getPosts: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
};
export default postService;
