import React, { createContext, useReducer, ReactNode, useContext } from 'react'
import { initialState, authReducer } from './reducer'
import { AuthState, AuthAction } from '../types'

const AuthStateContext = createContext<AuthState>({} as AuthState)
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction>>(
  {} as React.Dispatch<AuthAction>
)

export const useAuthState = () => useContext(AuthStateContext)

export const useAuthDispatch = () => useContext(AuthDispatchContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState
  )

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
