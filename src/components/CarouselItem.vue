<template>
  <div
    :class="[
      'carousel__item',
      { 'carousel__item--active': isActive },
      { 'carousel__item--next': isNext },
      { 'carousel__item--prev': isPrev }
    ]"
  >
    <img :src="slide.src" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CarouselSlide } from "@/types/carousel";

@Component({
  components: {}
})
export default class CarouselItem extends Vue {
  @Prop() slide!: CarouselSlide;
  @Prop() isActive!: boolean;
  @Prop() isPrev!: boolean;
  @Prop() isNext!: boolean;
}
</script>

<style scoped lang="scss">
.carousel__item {
  position: absolute;
  top: 0;
  transition: left 1s linear;
  &--active {
    left: 0;
  }
  &--prev {
    left: -100%;
  }
  &--next {
    left: 100%;
  }
}
</style>
