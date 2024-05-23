import api from "./api";

export const followUser = async (userId: string) =>
  (await api.post("/api/follow", { userId })).data;

export const unFollowUser = async (userId: string) =>
  (await api.delete("/api/follow", { data: { userId } })).data;
