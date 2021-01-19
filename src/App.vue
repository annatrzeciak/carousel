<template>
  <div id="app">
    <carousel-track :carousel="carousel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarouselTrack from "@/components/CarouselTrack.vue";
import { Carousel } from "@/types/carousel";

@Component({
  components: {
    CarouselTrack
  }
})
export default class App extends Vue {
  carousel: Carousel = {
    slides: [
      {
        id: 1,
        src:
          "https://cdn.pixabay.com/photo/2016/01/19/17/48/woman-1149911_1280.jpg"
      },
      {
        id: 2,
        src:
          "https://cdn.pixabay.com/photo/2017/12/30/11/58/sexy-3049894_1280.jpg"
      },
      {
        id: 3,
        src:
          "https://cdn.pixabay.com/photo/2016/01/19/17/51/girls-1149935_1280.jpg"
      },
      {
        id: 4,
        src:
          "https://cdn.pixabay.com/photo/2018/04/21/14/52/portrait-3338642_1280.jpg"
      },
      {
        id: 5,
        src:
          "https://cdn.pixabay.com/photo/2017/11/10/12/53/face-2936245_1280.jpg"
      },
      {
        id: 6,
        src:
          "https://cdn.pixabay.com/photo/2017/02/10/15/11/guy-2055375_1280.jpg"
      }
    ],
    slidesToShow: 4
  };
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
#app {
  height: 100vh;
}
</style>
