import api from "./api";

export const getPosts = async (userId?: string) =>
  (
    await api.get("/api/post", {
      params: {
        userId,
      },
    })
  ).data;

export const getPost = async (postId?: string) =>
  (await api.get(`/api/posts/${postId}`)).data;

export const createPost = (data: { body: string }) =>
  api.post("/api/post", data);

export const likePost = async (postId: string) =>
  (await api.post("/api/like", { postId })).data;

export const unlikePost = async (postId: string) =>
  (await api.delete("/api/like", { data: { postId } })).data;
