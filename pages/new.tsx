import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../component/Layout'
import { useAuthState, useAuthDispatch, loginUser } from '../context'
import { useRouter } from 'next/router'
import crudService from '../service/memoryService'
// import Map from '../component/Map'
import dynamic from 'next/dynamic'
//@ts-ignore
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

const NewPage: NextPage = () => {
  const { username, token,loading } = useAuthState()
  const dispatch = useAuthDispatch()
  const router = useRouter()
  const [clickLatLon, setClickLatLon] = useState<[number, number]>([0, 0])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [year, setYear] = useState(2007)
  const [picturePath, setPicturePath] = useState<string[]>([])

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../component/Map'), {
        loading: () => null,
        ssr: false,
      }),
    []
  )

  useEffect(() => {
    if (!loading && !username) {
      dispatch({ type: 'LOGIN_ERROR', error: 'You must be logged in to view this page' })
      router.replace('/login')
    }
  }, [dispatch, router, loading, username])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = {
      title,
      description,
      year,
      picturePath,
      username,
      lat: clickLatLon[0],
      lon: clickLatLon[1],
    }
    crudService
      .createMemory(data, token)
      .then((res) => {
        router.push(`/memory/${res.id}`)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const handleCloudinarySubmitSuccess = ({ info, event }: any) => {
    if (event === 'success') {
      setPicturePath((picturePath) => [...picturePath, info.public_id])
    }
  }
  // if (loading) {
  //   return null
  // }

  return (
    <Layout title='Old City Memory | New' transparent={false}>
      <div className='max-w-5xl mx-auto mt-4'>
        <h1 className='text-2xl font-bold p-4'>New Memory Place</h1>
        <form className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 px-4'>
            <div className='py-2'>
              <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-double focus:shadow-md'
                id='name'
                type='text'
                placeholder='Name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='py-2'>
              <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='year'>
                Year
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-double focus:shadow-md'
                id='year'
                type='number'
                placeholder='Year'
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
              />
            </div>
            <div className='py-2'>
              <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='description'>
                Description
              </label>
              <textarea
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-double focus:shadow-md'
                id='description'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='py-2'>
              <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='coordinate'>
                Coordinate (Double click on the map to set)
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-double focus:shadow-md'
                id='coordinate'
                type='text'
                disabled
                value={`${clickLatLon[0].toFixed(4)}, ${clickLatLon[1].toFixed(4)}`}
              />
            </div>
            <div className='py-2 flex justify-between'>
              {username && (
                <div>
                  <WidgetLoader className='h-screen' />
                  <Widget
                    sources={['local']}
                    resourceType={'image'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
                    cloudName={'kanfu'} // your cloudinary account cloud name.
                    // Located on https://cloudinary.com/console/
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} // check that an upload preset exists and check mode is signed or unisgned
                    onSuccess={handleCloudinarySubmitSuccess}
                    buttonText={'Upload Images'} // default 'Upload Files'
                    style={{
                      color: 'white',
                      border: 'none',
                      backgroundColor: 'green',
                      borderRadius: '4px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                    }}
                    // inline styling only or style id='cloudinary_upload_button'
                    folder={`Old_Photos_Gallery/${username}/`} // set cloudinary folder name to send file
                    cropping={false} // set ability to crop images -> default = true
                    multiple={true} // set to false as default. Allows multiple file uploading
                    // will only allow 1 file to be uploaded if cropping set to true
                    autoClose={false} // will close the widget after success. Default true
                    logging={false} // logs will be provided for success and failure messages,
                    // set to false for production -> default = true
                    // To use the file name as the public_id use 'use_filename={true}' parameter
                    eager={'w_400,h_300,c_pad'} // add eager transformations -> deafult = null
                    use_filename={false}
                  />
                </div>
              )}

              <button
                disabled={
                  !username ||
                  !title ||
                  !year ||
                  !clickLatLon[0] ||
                  !clickLatLon[1] ||
                  picturePath.length === 0
                }
                className='py-2 px-4 text-sm text-white rounded border bg-blue-500 border-blue-500 disabled:opacity-30 disabled:hover:bg-blue-500  disabled:hover:border-blue-500 hover:bg-blue-600 hover:border-blue-700'
                onClick={handleSubmit}
                type='button'
              >
                Submit
              </button>
            </div>
          </div>
          <div className='w-full md:w-1/2 px-4'>
            <Map
              setClickLatLon={setClickLatLon}
              sizeRestricted={true}
              centerCoordinate={undefined}
              zoom={undefined}
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default NewPage
