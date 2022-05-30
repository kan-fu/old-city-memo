import type { NextPage } from 'next'
import Layout from '../component/Layout'
import Image from 'next/image'

const AboutPage: NextPage = () => {
  return (
    <Layout title='Old City Memory | About' transparent={true}>
      <div className='relative pt-16 flex content-center items-center justify-center'>
        <div
          className='absolute top-0 w-full h-full bg-center bg-cover lg:h-screen'
          style={{
            backgroundImage: "url('hanfeng_lake.jpg')",
          }}
        >
          <span id='blackOverlay' className='w-full h-full absolute opacity-50 bg-black'></span>
        </div>
        <div className='container relative mx-auto'>
          <div className='items-center flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 text-lg text-gray-300 p-4 lg:p-8 mx-4'>
              <p className='p-2'>
                In the effort to build the Three Gorges Dam, China had started a mass migration
                project to help relocate 1.3 million residents that were affected across several
                provinces. The old town in Kaixian, Chongqing was completely demolished, and
                was finally submerged in the reservoir in 2008, ending its 1800-year history dating
                back from the Han dynasty.
              </p>
              <p className='p-2'>
                After that, Kaixian experienced a great economic boost. People live in new homes,
                Kaixian becomes Kaizhou District, and the place where the old town once lies is now
                a beautiful lakeside scenery called Hanfeng Lake. However, some artifacts are lost
                forever, including old alleyways, cultural heritages, archeological sites, and most
                importantly, memories of the old days. Young generations would not even have the
                chance to see it in person. I hope this could be a place where people can share
                their memories and build a historical record of the lost city.
              </p>
            </div>

            <div className='w-full lg:w-1/2 px-4 text-center max-w-[80vw] mx-auto'>
              <img src='/old_city_kai_map.jpg' alt='old city kai map' width='400' height='324' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
