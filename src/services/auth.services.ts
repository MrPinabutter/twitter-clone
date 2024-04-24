import api from "./api"

type LoginProps = { email: string, password: string }

export const login = async (params: LoginProps) => {
  const { data } = await api.post("login", params)

  return data
}