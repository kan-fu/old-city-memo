import dynamic from 'next/dynamic'
import React from 'react'
import Layout from '../component/Layout'
import type { NextPage } from 'next'
const MapPage: NextPage = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import('../component/Map'), {
        loading: () => null,
        ssr: false,
      }),
    []
  )
  return (
    <Layout title='Old City Memory | Map' transparent={false}>
      <Map setClickLatLon={undefined} sizeRestricted={false} centerCoordinate={undefined} zoom={undefined} />
    </Layout>
  )
}

export default MapPage