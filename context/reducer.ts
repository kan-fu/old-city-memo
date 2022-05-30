import React, { useState, useReducer } from 'react'
import { AuthState, AuthAction } from '../types'

export const initialState: AuthState = {
  username: '',
  token: '',
  role: '',
  loading: true,
  errorMessage: '',
}

export const authReducer = (initialState: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'INIT_SET':
      return {
        ...initialState,
        ...action.payload,
      }
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        errorMessage: '',
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        username: action.payload.username,
        token: action.payload.token,
        role: action.payload.role,
        loading: false,
        errorMessage: '',
      }
    case 'LOGOUT':
      return {
        ...initialState,
        username: '',
        token: '',
        role: '',
        loading: false,
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...initialState,
        loading: false,
        errorMessage: '',
      }
  }
}
