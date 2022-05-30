export interface UserInfo {
  username: string
  role: string
  token: string
  loading: boolean
}

export interface AuthState extends UserInfo {
  loading: boolean
  errorMessage: string
}

export interface LoginResponse {
  id: string
  username: string
  token: string
  role: 'ROLE_ADMIN' | 'ROLE_USER'
  type: 'Bearer'
}

export interface LoginPayload {
  username: string
  password: string
}

export type AuthAction =
  | {
      type: 'REQUEST_LOGIN' | 'LOGOUT'
    }
  | {
      type: 'LOGIN_SUCCESS'
      payload: LoginResponse
    }
  | {
      type: 'LOGIN_ERROR'
      error: string
    }
  | {
      type: 'INIT_SET'
      payload: UserInfo
    }
  | {
      type: 'SIGNUP_SUCCESS'
    }

export interface MemoryData {
  id?: string
  title: string
  year: number
  description: string
  lat: number
  lon: number
  username: string
  picturePath: string[]
}
