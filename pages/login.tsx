import type { NextPage } from 'next'
import Layout from '../component/Layout'
import Login from '../component/Login'

const LoginPage: NextPage = () => {
  return (
    <Layout title='Old City Memory | Login' transparent={true}>
      <Login />
    </Layout>
  )
}

export default LoginPage
