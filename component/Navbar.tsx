import React, { ReactElement, useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { useAuthState, useAuthDispatch, logout } from '../context'
import { useRouter } from 'next/router'

function Navbar({ transparent }: { transparent: boolean }): ReactElement {
  const [navbarOpen, setNavbarOpen] = useState(false)
  // const [username, setUsername] = useState<string>('')
  const { username } = useAuthState()
  const dispatch = useAuthDispatch()
  const router = useRouter()

  const handleLogout = () => {
    logout(dispatch)
    router.push('/')
  }

  return (
    <nav
      className={
        (transparent ? 'top-0 absolute z-50 w-full ' : 'relative shadow-lg bg-gray-200') +
        ' flex flex-wrap items-center justify-between px-2 py-3 '
      }
    >
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <p
            className={
              (transparent ? 'text-white' : 'text-gray-800') +
              ' title-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
            }
          >
            Old City Memory &minus; Kai County
          </p>
          <button
            className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <GiHamburgerMenu className={transparent ? 'text-white' : 'text-gray-800'} />
          </button>
        </div>
        <div
          className={
            'lg:flex grow lg:grow-0 items-center bg-white/75    lg:bg-transparent lg:shadow-none' +
            (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
          }
          id='example-navbar-warning'
        >
          <ul className='flex flex-col lg:flex-row list-none '>
            <li className='flex items-center'>
              <Link href='/'>
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/map'>
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  Map
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/new'>
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  New
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/about'>
                <a
                  className={
                    (transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  About
                </a>
              </Link>
            </li>
            {username ? (
              <LoggedInNavbar
                username={username}
                transparent={transparent}
                handleLogout={handleLogout}
              />
            ) : (
              <LoggedOutNavbar transparent={transparent} />
            )}

            {/* <li className='flex items-center'>
              <button
                className='bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                type='button'
                style={{ transition: 'all .15s ease' }}
              >
                Download
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

const LoggedInNavbar = ({
  transparent,
  username,
  handleLogout,
}: {
  transparent: boolean
  username: string
  handleLogout: () => void
}) => (
  <li className='flex items-center'>
    <span
      className={
        (transparent
          ? 'lg:text-white text-gray-800'
          : 'text-gray-800') +
        ' px-3 py-4 lg:py-2 flex items-center text-xs font-bold'
      }
    >
      Hi, {username}
    </span>
    <button
      className={
        (transparent
          ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
          : 'text-gray-800 hover:text-gray-600') +
        ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
      }
      onClick={handleLogout}
    >
      Log out
    </button>
  </li>
)

const LoggedOutNavbar = ({ transparent }: { transparent: boolean }) => (
  <>
    <li className='flex items-center'>
      <Link href='/login'>
        <a
          className={
            (transparent
              ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
              : 'text-gray-800 hover:text-gray-600') +
            ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
          }
        >
          Log in
        </a>
      </Link>
    </li>
    <li className='flex items-center'>
      <Link href='/signup'>
        <a
          className={
            (transparent
              ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
              : 'text-gray-800 hover:text-gray-600') +
            ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
          }
        >
          Sign up
        </a>
      </Link>
    </li>
  </>
)

export default Navbar
