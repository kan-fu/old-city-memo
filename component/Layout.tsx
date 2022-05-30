import { PropsWithChildren, useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import crudService from '../service/memoryService'
import { useAuthDispatch, useAuthState } from '../context/context'
import { UserInfo } from '../types'
import { useRouter } from 'next/router'
// import Footer from './Footer'

interface Props {
  title?: string
  transparent: boolean
}

const Layout = ({ title, transparent, children }: PropsWithChildren<Props>) => {
  const dispatch = useAuthDispatch()
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('currentUser')
    if (loggedUser) {
      const userInfo: UserInfo = { ...JSON.parse(loggedUser), loading: false }
      dispatch({ type: 'INIT_SET', payload: userInfo })
    } else {
      dispatch({ type: 'INIT_SET', payload: { username: '', token: '', role: '', loading: false } })
    }
  }, [dispatch])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Old city memory website for Kaixian, Chongqing' />
      </Head>
      <header>
        <Navbar transparent={transparent} />
      </header>
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Layout
