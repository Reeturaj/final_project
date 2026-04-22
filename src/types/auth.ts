export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  user: AuthUser
}

export interface AuthUser {
  id: number
  name: string
  username: string
  role: string
  email: string
}
