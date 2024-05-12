import api from "./api"

type LoginProps = { email: string, password: string }

export const register = async (params: LoginProps) => {
  const { data } = await api.post("/api/register", params)

  return data
}

export const getUser = async () => (await api.get(`/api/current`)).data