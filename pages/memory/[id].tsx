import React, { cloneElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Layout from '../../component/Layout'
import memoryService from '../../service/memoryService'
import Carousel from '../../component/Carousel'
import { MemoryData } from '../../types'
import dynamic from 'next/dynamic'
import { MAX_ZOOM } from '../../constants'
import { useAuthState } from '../../context/context'
import DeleteModal from '../../component/DeleteModal'
const Memory: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [memory, setMemory] = useState<MemoryData>()
  const { username, role, token } = useAuthState()
  const [showModal, setShowModal] = React.useState(false)

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../component/Map'), {
        loading: () => null,
        ssr: false,
      }),
    []
  )

  useEffect(() => {
    if (router.isReady) {
      if (!id) {
        router.push('/map')
      } else {
        memoryService.getOneMemory(id as string).then((res) => setMemory(res))
      }
    }
  }, [router.isReady, id, router])

  if (!memory) {
    return null
  }
  return (
    <Layout title='Old City Memory | Memory' transparent={false}>
      <div className='max-w-5xl mx-auto mt-4 flex flex-col md:flex-row'>
        <div className='m-4 md:w-1/2 rounded overflow-hidden shadow-lg '>
          <Carousel picturePath={memory.picturePath} title={memory.title} />
          <div className='px-6 py-4 '>
            <h1 className='text-lg mb-2'>
              {memory.title} ({memory.year}) by {memory.username}
            </h1>
            {memory.description && (
              <>
                <h2>Description</h2>
                <p className='text-gray-700 text-base'>{memory.description}</p>
              </>
            )}
          </div>
          {/* if logged user is admin or the author of the memory, display the edit button*/}
          {username && (username === memory.username || role == 'ROLE_ADMIN') && (
            <div className='flex justify-end p-4'>
              {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>
                Edit
              </button> */}
              <button
                onClick={() => setShowModal(true)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className='w-full md:w-1/2 m-4 z-10'>
          <Map
            setClickLatLon={undefined}
            sizeRestricted={true}
            centerCoordinate={[memory.lat, memory.lon]}
            zoom={MAX_ZOOM}
          />
        </div>
      </div>
      {showModal ? <DeleteModal setShowModal={setShowModal} id={id as string} /> : null}
    </Layout>
  )
}

export default Memory
