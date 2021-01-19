export interface CarouselSlide {
  src: string;
}

export interface Carousel {
  slides: Array<CarouselSlide>;
  slidesToShow: number;
}
