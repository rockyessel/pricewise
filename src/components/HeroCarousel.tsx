'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
  { imgURL: '/assets/images/hero-1.svg', alt: 'smartwatch' },
  { imgURL: '/assets/images/hero-2.svg', alt: 'bag' },
  { imgURL: '/assets/images/hero-3.svg', alt: 'lamp' },
  { imgURL: '/assets/images/hero-4.svg', alt: 'air fryer' },
  { imgURL: '/assets/images/hero-5.svg', alt: 'chair' },
];

const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <Image
            key={index}
            src={image.imgURL}
            width={484}
            height={484}
            alt={image.alt}
            className='object-contain'
          />
        ))}
      </Carousel>

      <Image
        src='/assets/icons/hand-drawn-arrow.svg'
        alt='Arrow'
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
      />
    </div>
  );
};

export default HeroCarousel;
