<template>
  <div class="carousel" v-if="carousel">
    <button class="carousel__button carousel__button--prev" @click="active--">
      &lt;
    </button>
    <carousel-item
      v-for="item in items"
      :item="item"
      :key="item.index"
      :active="active"
    />
    <button class="carousel__button carousel__button--next" @click="active++">
      &gt;
    </button>
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
    console.log(this.slidesToShow);
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
    top: 50%;
    &--prev {
      left: 15px;
    }
    &--next {
      right: 15px;
    }
  }
}
</style>
