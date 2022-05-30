import type { NextPage } from 'next'
import Layout from '../component/Layout'

const Home: NextPage = () => {
  return (
    <Layout title='Old City Memory' transparent={true}>
      <div className='relative pt-16 pb-32 flex content-center items-center justify-center h-screen'>
        <div
          className='absolute top-0 w-full h-full bg-center bg-cover'
          style={{
            backgroundImage: `url("landing.jpg")`,
          }}
        >
          <span id='blackOverlay' className='w-full h-full absolute opacity-40 bg-black'></span>
        </div>
        <div className='container relative mx-auto'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full lg:w-2/3 px-4 ml-auto mr-auto text-center'>
              <div>
                <h1 className='text-white font-semibold text-5xl'>
                  A picture is worth a thousand words
                </h1>
                <p className='mt-4 text-lg text-gray-300'>
                  This site tries to record the memories of the good old days with the help of
                  community efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
