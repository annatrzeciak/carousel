export interface CarouselSlide {
  id: number;
  src: string;
}

export interface Carousel {
  slides: Array<CarouselSlide>;
  slidesToShow: number;
  slidesToShowMobile: number;
}
