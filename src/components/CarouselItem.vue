<template>
  <div
    :class="[
      'carousel__item',
      { 'carousel__item--active': active === index },
      { 'carousel__item--next': active < index },
      { 'carousel__item--prev': active > index }
    ]"
    :style="[{ left }, { 'z-index': zIndex }]"
  >
    <img
      v-for="slide in item.slides"
      :src="slide.src"
      :key="index + '_' + slide.id"
      :style="{ width: 100 / item.slides.length + '%' }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CarouselSlide } from "@/types/carousel";

@Component({
  components: {}
})
export default class CarouselItem extends Vue {
  @Prop() item!: { index: number; slides: [CarouselSlide] };
  @Prop() moveX!: number;

  @Prop() active!: number;
  get left() {
    if (this.active > this.index) {
      return "calc(-100% + " + this.moveX + "px)";
    } else if (this.active === this.index) {
      return this.moveX + "px";
    } else {
      return "calc(100% + " + this.moveX + "px)";
    }
  }
  get zIndex() {
    if (this.active < this.index) {
      return 100 - this.index;
    } else if (this.active === this.index) {
      return 100;
    }
    return 2;
  }
  get index() {
    return this.item.index;
  }
}
</script>

<style scoped lang="scss">
.carousel__item {
  position: absolute;
  top: 0;
  transition: left 0.7s linear;
  -o-transition: left 0.7s linear;
  -ms-transition: left 0.7s linear;
  -webkit-transition: left 0.7s linear;
  height: 100%;
  width: 100%;
  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
