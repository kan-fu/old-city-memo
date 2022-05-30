import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { icon, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useEffect, useState } from 'react'
// @ts-ignore
import { FullscreenControl } from 'react-leaflet-fullscreen'
import 'react-leaflet-fullscreen/dist/styles.css'
import memoryService from '../service/memoryService'
import { MemoryData } from '../types'
import Image from 'next/image'
import {
  cloudinaryUrl,
  openstreetmapUrl,
  esriWaybackUrl,
  DEFAULT_ZOOM,
  MAX_ZOOM,
} from '../constants'
import { useAuthState } from '../context'

const ICON = icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconSize: [24, 40],
  iconAnchor: [12, 40],
})
const ICON_RED = icon({
  iconUrl: '/leaflet/marker-icon-red.png',
  iconSize: [24, 40],
  iconAnchor: [12, 40],
})
const ICON_YELLOW = icon({
  iconUrl: '/leaflet/marker-icon-yellow.png',
  iconSize: [24, 40],
  iconAnchor: [12, 40],
})

const LocationMarker = ({
  setClickLatLon,
}: {
  setClickLatLon: React.Dispatch<React.SetStateAction<[number, number]>>
}) => {
  const [position, setPosition] = useState(null)
  useMapEvents({
    dblclick(e: any) {
      const { lat, lng } = e.latlng
      setPosition(e.latlng)
      setClickLatLon([lat, lng])
    },
  })

  return position ? <Marker position={position} icon={ICON_RED} /> : null
}

const Map = ({
  setClickLatLon,
  sizeRestricted,
  centerCoordinate,
  zoom,
}: {
  setClickLatLon: React.Dispatch<React.SetStateAction<[number, number]>> | undefined
  sizeRestricted: boolean
  centerCoordinate: [number, number] | undefined
  zoom: number | undefined
}) => {
  const [memories, setMemories] = useState<MemoryData[]>([])
  const { username: author } = useAuthState()

  useEffect(() => {
    memoryService.getAllMemory().then((res) => {
      setMemories(res)
    })
  }, [])

  const isCoordSameasCenter = (
    lat: number,
    lon: number,
    centerCoordinate: [number, number] | undefined
  ) => centerCoordinate && centerCoordinate[0] === lat && centerCoordinate[1] === lon

  return (
    <MapContainer
      className={sizeRestricted ? 'h-96' : 'h-[calc(100vh_-_66px)]' + ' w-full'}
      center={centerCoordinate || [31.19, 108.415]}
      zoom={zoom || DEFAULT_ZOOM}
    >
      <LayersControl position='topright'>
        <LayersControl.BaseLayer name='OpenStreetMap'>
          <TileLayer
            url={openstreetmapUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name='ESRI'>
          <TileLayer
            maxZoom={MAX_ZOOM}
            url={esriWaybackUrl}
            attribution='Powered by &copy; <a href="http://www.esri.com/">Esri</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name='Places'>
          <MarkerClusterGroup>
            {memories.map(({ id, lat, lon, picturePath, title, year, username }) => (
              <Marker
                key={id}
                position={[lat, lon]}
                icon={
                  isCoordSameasCenter(lat, lon, centerCoordinate)
                    ? ICON_RED
                    : username === author
                    ? ICON_YELLOW
                    : ICON
                }
              >
                {console.log(username, 'and',author)}
                <Popup>
                  <div className={'max-w-[80vw]'}>
                    <img
                      src={`${cloudinaryUrl}/w_400,h_300,c_pad/${
                        picturePath[Math.floor(Math.random() * picturePath.length)]
                      }`}
                      alt={title}
                      width='400'
                      height='300'
                      // layout='responsive'
                    />
                  </div>
                  {/* <Link href={`/memory/${encodeURIComponent(id as string)}`}> */}
                  <a
                    className='flex items-center justify-center underline'
                    href={`/memory/${encodeURIComponent(id as string)}`}
                  >
                    {title} ({year})
                  </a>
                  {/* </Link> */}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {setClickLatLon && <LocationMarker setClickLatLon={setClickLatLon} />}

      <FullscreenControl />
    </MapContainer>
  )
}

export default Map
