<template>
  <div
    class="carousel"
    v-if="carousel"
    @mousedown.prevent="mouseDown"
    v-touch:start="touchDown"
    @mousemove.prevent="mouseMove"
    v-touch:moving="touchMove"
    @mouseup.prevent="mouseUp"
    v-touch:end="touchUp"
  >
    <button
      class="carousel__button carousel__button--prev"
      @click.stop="active--"
    >
      &lsaquo;
    </button>

    <carousel-item
      v-for="item in items"
      :item="item"
      :key="item.index"
      :active="active"
      :moveX="moveX"
    />
    <button
      class="carousel__button carousel__button--next"
      @click.stop="active++"
    >
      &rsaquo;
    </button>
    <div class="carousel__labels">
      <h2 class="carousel__title" v-if="carousel.title">
        {{ carousel.title }}
      </h2>
      <p class="carousel__text" v-if="carousel.text">{{ carousel.text }}</p>
      <div class="carousel__buttons" v-if="carousel.buttons">
        <button
          v-for="(button, i) in carousel.buttons"
          :key="i"
          @click="$emit(button.emit)"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Carousel, CarouselSlide } from "@/types/carousel";
import CarouselItem from "@/components/CarouselItem.vue";

@Component({
  components: { CarouselItem }
})
export default class CarouselTrack extends Vue {
  @Prop() carousel!: Carousel;
  slidesToShow = 3;
  mouseIsDown = false;
  startX = 0;
  currentX = 0;
  get moveX() {
    return this.currentX - this.startX;
  }
  itemsBase: Array<{
    index: number;
    slides: Array<CarouselSlide>;
  }> = [];
  itemsBefore: Array<{
    index: number;
    slides: Array<CarouselSlide>;
  }> = [];
  itemsAfter: Array<{
    index: number;
    slides: Array<CarouselSlide>;
  }> = [];

  get items() {
    return [...this.itemsBefore, ...this.itemsBase, ...this.itemsAfter];
  }
  mouseDown(e: MouseEvent) {
    this.mouseIsDown = true;

    this.startX = e.pageX;
    this.currentX = e.pageX;
  }
  touchDown(e: TouchEvent) {
    if (e.touches) {
      this.mouseIsDown = true;
      this.startX = e.touches[0].pageX;
      this.currentX = e.touches[0].pageX;
    }
  }
  mouseMove(e: MouseEvent) {
    if (this.mouseIsDown) {
      this.currentX = e.pageX;
    }
  }
  touchMove(e: TouchEvent) {
    if (this.mouseIsDown && e.touches) {
      this.currentX = e.touches[0].pageX;
    }
  }
  mouseUp(e: MouseEvent) {
    if (e.view) {
      if (this.moveX > e.view.innerWidth / 3) {
        this.active--;
      } else if (-this.moveX > e.view.innerWidth / 3) {
        this.active++;
      }
    }

    this.currentX = 0;
    this.startX = 0;
    this.mouseIsDown = false;
  }
  touchUp(e: TouchEvent) {
    if (e.view) {
      if (this.moveX > e.view.innerWidth / 3) {
        this.active--;
      } else if (-this.moveX > e.view.innerWidth / 3) {
        this.active++;
      }
    }
    this.currentX = 0;
    this.startX = 0;
    this.mouseIsDown = false;
  }
  mapSlidesToCarouselItems(): Array<{
    index: number;
    slides: Array<CarouselSlide>;
  }> {
    const items = [];
    if (this.carousel.slides) {
      for (
        let i = 0;
        i < this.carousel.slides.length / this.slidesToShow;
        i++
      ) {
        items.push(this.getNSlide(i));
      }
    }
    return items;
  }
  getNSlide(n: number) {
    const slides = [];
    for (let j = 0; j < this.slidesToShow; j++) {
      const index = (n * this.slidesToShow + j) % this.carousel.slides.length;

      if (index < 0) {
        slides.push(this.carousel.slides[this.carousel.slides.length + index]);
      } else {
        slides.push(this.carousel.slides[index]);
      }
    }
    return { index: n, slides };
  }
  setSlidesToShow() {
    if (window.innerWidth < 576) {
      this.slidesToShow = this.carousel.slidesToShowMobile;
    } else {
      this.slidesToShow = this.carousel.slidesToShow;
    }
  }
  beforeMount() {
    window.addEventListener("resize", () => this.setSlidesToShow());
  }
  beforeDestroy() {
    window.removeEventListener("resize", () => this.setSlidesToShow());
  }
  created() {
    this.setSlidesToShow();
    this.itemsBase = this.mapSlidesToCarouselItems();
    this.checkThatExistItemBeforeAndAfter();
  }

  active = 0;

  @Watch("active")
  async onActiveChange() {
    this.checkThatExistItemBeforeAndAfter();
  }

  @Watch("slidesToShow")
  async onSlidesToShowChange() {
    this.itemsBase = this.mapSlidesToCarouselItems();
    this.checkThatExistItemBeforeAndAfter();
  }

  checkThatExistItemBeforeAndAfter() {
    if (this.active === this.items[0].index) {
      this.itemsBefore.unshift(this.getNSlide(this.active - 1));
    }
    if (this.active === this.items[this.items.length - 1].index) {
      this.itemsAfter.push(this.getNSlide(this.active + 1));
    }
  }
}
</script>

<style scoped lang="scss">
.carousel {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  &__button {
    position: absolute;
    z-index: 1000;
    top: calc(50% - 49px);
    padding: 10px 20px;
    border: none;
    font-size: 50px;
    color: white;
    background: transparent;
    font-weight: lighter;
    cursor: pointer;
    transition: linear 0.3s;
    -ms-transition: linear 0.3s;
    -o-transition: linear 0.3s;
    -webkit-transition: linear 0.3s;
    &:hover {
      opacity: 0.6;
    }
    &:focus {
      outline: none;
      transform: scale(0.9);
    }
    &--prev {
      left: 15px;
    }
    &--next {
      right: 15px;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  &__labels {
    z-index: 1000;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__title {
    z-index: 1000;

    margin-top: 150px;
    position: relative;
    text-align: center;
    color: white;
    text-transform: uppercase;
    font-size: 40px;
    margin-bottom: 15px;
  }
  &__text {
    z-index: 1000;
    margin-top: 0;
    margin-bottom: 15px;
    max-width: 500px;
    width: 80%;
    position: relative;
    text-align: center;
    color: white;
  }
  &__buttons {
    z-index: 1000;
    width: 80%;
    display: flex;
    justify-content: center;
    text-align: center;
    color: white;
    flex-wrap: wrap;
    button {
      padding: 10px 20px;
      text-transform: uppercase;
      color: white;
      background: transparent;
      border: 1px solid white;
      margin: 15px 30px;
      width: 300px;
      height: 36px;
      cursor: pointer;
      transition: linear 0.3s;
      -o-transition: linear 0.3s;
      -ms-transition: linear 0.3s;
      -webkit-transition: linear 0.3s;
      &:hover {
        opacity: 0.6;
      }
      &:focus {
        outline: none;
        transform: scale(0.9);
      }
    }
  }
}
</style>
