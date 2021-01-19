<template>
  <div
    :class="[
      'carousel__item',
      { 'carousel__item--active': active === index },
      { 'carousel__item--next': active < index },
      { 'carousel__item--prev': active > index }
    ]"
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

  @Prop() active!: number;

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
  height: 100%;
  width: 100%;
  &--active {
    left: 0;
  }
  &--prev {
    left: -100%;
  }
  &--next {
    left: 100%;
  }
  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
