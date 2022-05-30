import React, { useState, useRef, useEffect, createRef } from 'react'
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai'
import Image from 'next/image'
import { cloudinaryUrl, carouselDelay } from '../constants'

let timer: NodeJS.Timer
const Carousel = ({ picturePath, title }: { picturePath: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)

  const startSlider = () => {
    timer = setInterval(() => {
      handleOnNextClick()
    }, carouselDelay)
  }

  const pauseSlider = () => {
    clearInterval(timer)
  }

  useEffect(() => {
    if (picturePath.length > 1) {
      startSlider()
      slideRef.current?.addEventListener('animationend', () => {
        slideRef.current?.classList.remove('fade-anim')
      })
      slideRef.current?.addEventListener('mouseleave', startSlider)
      slideRef.current?.addEventListener('mouseenter', pauseSlider)

      return pauseSlider
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnPrevClick = () => {
    setCurrentIndex((prevState) => (prevState - 1 + picturePath.length) % picturePath.length)

    slideRef.current?.classList.add('fade-anim')
  }
  const handleOnNextClick = () => {
    setCurrentIndex((prevState) => (prevState + 1) % picturePath.length)

    slideRef.current?.classList.add('fade-anim')
  }

  return (
    <div className='max-w-[80vw] md:max-w-md m-auto'>
      <div ref={slideRef} className='w-full h-full relative fade-anim'>
        <a href={`${cloudinaryUrl}/${picturePath[currentIndex]}`} rel='noreferrer' target='_blank'>
          <Image
            src={`${cloudinaryUrl}/w_400,h_300,c_pad/${picturePath[currentIndex]}`}
            alt={title}
            width='400'
            height='300'
            className='w-full'
            layout='responsive'
            objectFit='contain'
            priority={true}
          />
        </a>
        <div
          className={
            picturePath.length > 1
              ? 'absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3'
              : 'hidden'
          }
        >
          <button
            className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            type='button'
            onClick={handleOnPrevClick}
          >
            <AiOutlineVerticalRight />
          </button>
          <button
            className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            type='button'
            onClick={handleOnNextClick}
          >
            <AiOutlineVerticalLeft />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Carousel
