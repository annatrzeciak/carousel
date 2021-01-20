export interface CarouselSlide {
  id: number;
  src: string;
}

export interface Carousel {
  slides: Array<CarouselSlide>;
  slidesToShow: number;
  slidesToShowMobile: number;
  title?: string;
  text?: string;
  buttons?: Array<{ text: string; emit: string }>;
}
