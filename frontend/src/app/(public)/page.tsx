'use client';
import 'lightbox2/dist/css/lightbox.min.css';
import Carousel from '@/app/components/home/Carousel';
import About from '@/app/components/home/About';
import Promotion from '@/app/components/home/Promotion';
import Services from '@/app/components/home/Services';
import Portfolio from '@/app/components/home/Portfolio';
import Products from '@/app/components/home/Products';
import Team from '@/app/components/home/Team';
import Testimonial from '@/app/components/home/Testimonial';

export default function Index() {
  return (
    <>
      <Carousel />
      <About />
      <Promotion />
      <Services />
      <Portfolio />
      <Products />
      <Team />
      <Testimonial />
    </>
  );
}
