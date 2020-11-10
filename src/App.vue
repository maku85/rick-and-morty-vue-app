<template>
  <v-app>
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <Header />
    <v-main
      id="scroll-target"
      v-scroll:#scroll-target="onScroll"
      class="flex-shrink-1 overflow-y-auto"
    >
      <router-view />
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="#40adc7"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer
  },

  data: () => ({
    fab: false
  }),
  methods: {
    onScroll(e: UIEvent) {
      if (typeof window === 'undefined') return
      const top = (e?.target as HTMLElement).scrollTop || 0
      this.fab = top > 200
    },
    scrollToTop() {
      let container = document.getElementById('scroll-target')
      if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
})
</script>

<style lang="scss">
@font-face {
  font-family: 'Rick and Morty';
  src: local('Rick and Morty'),
    url(./fonts/rick_and_morty.ttf) format('truetype');
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

html {
  overflow: hidden;
}

body {
  height: 100vh;
}

#app {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  font-family: 'Rick and Morty', serif;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main {
  height: 100vh;
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
