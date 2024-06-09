import api from "./api";

type LoginProps = { email: string; password: string };

export const register = async (params: LoginProps) => {
  const { data } = await api.post("/api/register", params);

  return data;
};

type UpdateUserProps = {
  name: string;
  username: string;
  profileImage: string;
  coverImage: string;
  bio: string;
};

export const updateUser = async (params: UpdateUserProps) => {
  const { data } = await api.patch("/api/edit", params);

  return data;
};

export const getCurrentUser = async () => (await api.get(`/api/current`)).data;

export const getUsers = async () => (await api.get(`/api/users`)).data;

export const getUserById = async (id: string) =>
  (await api.get(`/api/users/${id}`)).data;

export const getUserNotifications = async () =>
  (
    await api.get(`/api/notifications`)
  ).data;
