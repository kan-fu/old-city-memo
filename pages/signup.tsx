import type { NextPage } from 'next'
import Layout from '../component/Layout'
import SignUp from '../component/SignUp'

const SignupPage: NextPage = () => {
  return (
    <Layout title='Old City Memory | Sign Up' transparent={true}>
      <SignUp />
    </Layout>
  )
}

export default SignupPage
