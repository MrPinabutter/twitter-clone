import api from "./api"

type LoginProps = { email: string, password: string }

export const login = async (params: LoginProps) => {
  const { data } = await api.post("/api/register", params)
  console.log("aqui ó", data);
  

  return data
}

export const getUser = async () => (await api.get(`/api/current`)).data