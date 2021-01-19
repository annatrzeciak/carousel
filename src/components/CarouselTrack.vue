<template>
  <div class="carousel" v-if="carousel">
    <button class="carousel__button carousel__button--prev" @click="active++">
      &lt;
    </button>
    <carousel-item
      v-for="(slide, i) in carousel.slides"
      :slide="slide"
      :key="i"
      :isActive="i === active"
      :isPrev="i < active"
      :isNext="i > active"
    />
    <button class="carousel__button carousel__button--next" @click="active--">
      &gt;
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Carousel } from "@/types/carousel";
import CarouselItem from "@/components/CarouselItem.vue";

@Component({
  components: { CarouselItem }
})
export default class CarouselTrack extends Vue {
  @Prop() carousel!: Carousel;

  active = 0;
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
    &--prev{
      left: 15px;
    }
    &--next{
      right: 15px;
    }
  }
}
</style>
