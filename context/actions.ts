import { AuthAction, LoginPayload } from '../types'
import {baseAuthUrl} from '../constants'

export async function loginUser(dispatch: React.Dispatch<AuthAction>, loginPayload: LoginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  }

  dispatch({ type: 'REQUEST_LOGIN' })
  let response = await fetch(`${baseAuthUrl}/signin`, requestOptions)
  if (response.status === 200) {
    const data = await response.json()
    dispatch({ type: 'LOGIN_SUCCESS', payload: data })
    localStorage.setItem('currentUser', JSON.stringify(data))
    return true
  } else {
    dispatch({ type: 'LOGIN_ERROR', error: 'Wrong username or password!' })
    return false
  }
}
export async function SignUpUser(dispatch: React.Dispatch<AuthAction>, loginPayload: LoginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  }

  dispatch({ type: 'REQUEST_LOGIN' })
  let response = await fetch(`${baseAuthUrl}/signup`, requestOptions)
  if (response.status === 200) {
    const data = await response.json()
    return true
  } else {
    dispatch({ type: 'LOGIN_ERROR', error: 'Username already exists' })
    return false
  }
}

export function logout(dispatch: React.Dispatch<AuthAction>) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
}
