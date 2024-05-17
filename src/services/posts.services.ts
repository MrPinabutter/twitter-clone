import api from "./api";

export const getPosts = (userId?: string) =>
  api.get("/api/post", {
    params: {
      userId,
    },
  });

export const createPost = (data: { body: string }) =>
  api.post("/api/post", data);
