import api from "./api";

export const getPosts = async (userId?: string) =>
  (
    await api.get("/api/post", {
      params: {
        userId,
      },
    })
  ).data;

export const createPost = (data: { body: string }) =>
  api.post("/api/post", data);
