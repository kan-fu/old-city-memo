import React, { useState } from 'react'
import { useAuthState, useAuthDispatch, SignUpUser } from '../context'
import { useRouter } from 'next/router'

const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAuthDispatch()
  const { loading, errorMessage } = useAuthState()
  const router = useRouter()

  const handleFormSubmit = async () => {
    const isSignedUp = await SignUpUser(dispatch, { username, password })
    if (isSignedUp) {
      router.push('/login')
    }
  }
  return (
    <div className='flex bg-gray-600 items-center justify-center h-screen'>
      <div className='max-w-md m-auto bg-gray-100 rounded-lg border border-black shadow-default py-10 px-16'>
        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
          Sign up to your account 🔐
        </h1>
        {errorMessage ? <p className='text-red-500'>{errorMessage}</p> : null}

        <form>
          <div>
            <label htmlFor='email'>Username</label>
            <input
              type='email'
              className='w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
              id='email'
              placeholder='Username'
              value={username}
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
              id='password'
              placeholder='Password'
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex justify-center items-center mt-6'>
            <button
              type='button'
              onClick={handleFormSubmit}
              disabled={loading || !username || !password}
              className='py-2 px-4 text-sm text-white rounded border bg-blue-500 border-blue-500 disabled:opacity-30 disabled:hover:bg-blue-500  disabled:hover:border-blue-500 hover:bg-blue-600 hover:border-blue-700'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
