<template>
  <v-app v-scroll:#scroll-target="onScroll">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <Header />
    <v-main id="scroll-target" class="flex-shrink-1">
      <router-view />
    </v-main>
    <Footer />

    <ScrollTop>
      <v-btn fab dark fixed bottom right color="#88be47" @click="scrollToTop">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </ScrollTop>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ScrollTop from '@/components/ScrollTop.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer,
    ScrollTop
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0b0e14;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #88be47;
}

#app {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  font-family: 'Montserrat', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@function multiple-box-shadow($n) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-big: multiple-box-shadow(100);

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $shadows-small;
  animation: animStar 50s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
  }
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-medium;
  animation: animStar 100s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
  }
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: $shadows-big;
  animation: animStar 150s linear infinite;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $shadows-big;
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>
